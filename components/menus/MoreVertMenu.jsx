import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// internal imports
import ContactMenuActionDialog from '@/components/dialogs/ContactMenuActionDialog';
import TwoFactorAuthDialog from '@/components/dialogs/TwoFactorAuthDialog';
import SendNotificationDialog from '@/components/dialogs/SendNotificationDialog';
import { actionMap } from '@/utils/vertMenuActionMap';
import { useSendNotificationStore } from '@/stores/notificationStore';

const MoreVertMenu = ({
  menuType,
  email,
  dialCode,
  phoneNumber,
  id,
  selected,
  setSelected,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isContactActionOpen, setIsContactActionOpen] = useState(false);
  const [isTwoFactorAuthOpen, setIsTwoFactorAuthOpen] = useState(false);
  const [isSendNotificationOpen, setIsSendNotificationOpen] = useState();
  const [menuAction, setMenuAction] = useState('');

  const [targetEmail, setTargetEmail] = useState('');
  const [targetNumber, setTargetNumber] = useState('');

  const router = useRouter();

  const { setSelectedUserIds } = useSendNotificationStore();

  const isMenuType = (type) => menuType === type;

  const isUserListTable =
    isMenuType('users-table') || isMenuType('users-table-toolbar');

  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAction('');
  };

  const handleClickAction = (event, action) => {
    if (isUserListTable) {
      const targetId = event.currentTarget.getAttribute('data-id');

      switch (action) {
        case 'edit':
          router.push(`/admin/dashboard/users/${targetId}/edit`);
          break;

        case 'delete':
          setIsTwoFactorAuthOpen(true);
          break;

        case 'send-notification':
          // setSelectedUserIds([...selected]);
          // router.push(`/admin/dashboard/notifications/send`);
          setIsSendNotificationOpen(true);
          setSelectedUserIds([...selected]);
          break;

        default:
          router.push('/admin/dashboard');
          break;
      }
    } else if (isMenuType('cards')) {
      setIsContactActionOpen(true);

      // conditions for user contact-information
      if (email) {
        setTargetEmail(event.currentTarget.getAttribute('data-email'));
      } else {
        setTargetNumber(event.currentTarget.getAttribute('data-number'));
      }
    }

    setMenuAction(action);
    setAnchorEl(null);
  };

  const options = actionMap[menuType] || actionMap.default;

  const menuItems = () =>
    options.map((option) => {
      const dataAttributes = {
        'data-id': isUserListTable ? id : null,
        'data-email': isMenuType('cards') && email ? email : null,
        'data-number':
          isMenuType('cards') && phoneNumber
            ? `${dialCode} ${phoneNumber}`
            : null,
      };

      return (
        <MenuItem
          key={option.action}
          {...dataAttributes}
          onClick={(event) => handleClickAction(event, option.action)}
        >
          {option.label}
        </MenuItem>
      );
    });

  return (
    <>
      <Box
        sx={{
          position: isMenuType('cards') ? 'absolute' : 'relative',
          top: isMenuType('cards') ? 8 : 'auto',
          right: isMenuType('cards') ? 8 : 'auto',
        }}
      >
        <IconButton
          aria-label="more options"
          id="overflow-button"
          aria-controls={open ? 'overflow-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleClickMoreVert}
        >
          <MoreVertIcon />
        </IconButton>

        <Menu
          id="overflow-menu"
          MenuListProps={{
            'aria-labelledby': 'overflow-button',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {menuItems()}
        </Menu>
      </Box>

      {isContactActionOpen && (
        <ContactMenuActionDialog
          isDialogOpen={isContactActionOpen}
          setIsDialogOpen={setIsContactActionOpen}
          menuType={menuType}
          targetEmail={targetEmail}
          targetNumber={targetNumber}
          menuAction={menuAction}
          setMenuAction={setMenuAction}
        />
      )}

      {isTwoFactorAuthOpen && (
        <TwoFactorAuthDialog
          title="2FA - Account Deletion"
          isDialogOpen={isTwoFactorAuthOpen}
          setIsDialogOpen={setIsTwoFactorAuthOpen}
          selected={selected}
        />
      )}

      {isSendNotificationOpen && (
        <SendNotificationDialog
          isDialogOpen={isSendNotificationOpen}
          setIsDialogOpen={setIsSendNotificationOpen}
          setSelected={setSelected}
        />
      )}
    </>
  );
};

export default React.memo(MoreVertMenu);
