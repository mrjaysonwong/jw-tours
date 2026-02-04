import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// internal imports
import ContactMenuActionDialog from '@/components/dialogs/ContactMenuActionDialog';
import TwoFactorAuthDialog from '@/components/dialogs/TwoFactorAuthDialog';
import SendNotificationDialog from '@/components/dialogs/SendNotificationDialog';
import ReviewMenuActionDialog from '@/components/dialogs/ReviewMenuActionDialog';
import { actionMap } from '@/constants/vertMenuActionMap';
import { useSendNotificationStore } from '@/stores/notificationStore';
import { menuActionHelpers } from '@/helpers/menuActionHelpers';

const MoreVertMenu = ({
  menuType,
  email,
  dialCode,
  phoneNumber,
  id,
  selected,
  setSelected,
  row,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [dialogState, setDialogState] = useState({ type: '', open: false });

  const [menuAction, setMenuAction] = useState('');

  const [targetEmail, setTargetEmail] = useState('');
  const [targetNumber, setTargetNumber] = useState('');

  const router = useRouter();

  const { setSelectedUserIds } = useSendNotificationStore();

  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAction('');
  };

  const handleClickAction = (event, action) => {
    const targetId = event.currentTarget.getAttribute('data-id');

    menuActionHelpers({
      event,
      menuType,
      action,
      targetId,
      setDialogState,
      selected,
      setSelectedUserIds,
      router,
      email,
      setTargetEmail,
      setTargetNumber,
    });

    setMenuAction(action);
    setAnchorEl(null);
  };

  const baseOptions = actionMap[menuType] || actionMap.default;

  // ✅ Filter actions based on row status
  const options = baseOptions.filter(
    (option) => !option.showIf || option.showIf(row)
  );

  const dataAttributes = {
    ...(id && { 'data-id': id }),
    ...(menuType === 'my-contact-info' && email && { 'data-email': email }),
    ...(menuType === 'my-contact-info' &&
      phoneNumber && {
        'data-number': `${dialCode} ${phoneNumber}`,
      }),
  };

  return (
    <>
      <Box>
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
          {options.map((option) => {
            return (
              <MenuItem
                key={option.action}
                {...dataAttributes}
                onClick={(event) => handleClickAction(event, option.action)}
              >
                {option.label}
              </MenuItem>
            );
          })}
        </Menu>
      </Box>

      {dialogState.type === 'contact-info-action' && (
        <ContactMenuActionDialog
          isDialogOpen={dialogState.open}
          setDialogState={setDialogState}
          targetEmail={targetEmail}
          targetNumber={targetNumber}
          menuAction={menuAction}
          setMenuAction={setMenuAction}
        />
      )}

      {dialogState.type === '2FA' && (
        <TwoFactorAuthDialog
          title="2FA - Account Deletion"
          isDialogOpen={dialogState.open}
          setDialogState={setDialogState}
          selected={selected}
        />
      )}

      {dialogState.type === 'send-notification' && (
        <SendNotificationDialog
          isDialogOpen={dialogState.open}
          setDialogState={setDialogState}
          setSelected={setSelected}
        />
      )}

      {dialogState.type === 'review-action' && (
        <ReviewMenuActionDialog
          isDialogOpen={dialogState.open}
          setDialogState={setDialogState}
          menuAction={menuAction}
          setMenuAction={setMenuAction}
          id={row._id}
        />
      )}
    </>
  );
};

export default React.memo(MoreVertMenu);
