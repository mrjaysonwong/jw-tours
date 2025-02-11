import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// internal imports
import MenuActionDialog from '../dialogs/MenuActionDialog';

const ACTION_OPTIONS = {
  default: [
    { label: 'View', action: 'view' },
    { label: 'Edit', action: 'edit' },
    { label: 'Delete', action: 'delete' },
  ],
  cards: [
    { label: 'Set as Primary', action: 'set-primary' },
    { label: 'Delete', action: 'delete' },
  ],
  'table-users': [
    { label: 'Edit', action: 'edit' },
    { label: 'Delete', action: 'delete' },
  ],
};

const MoreVertMenu = ({ menuType, email, dialCode, phoneNumber, userId }) => {
  const isMenuType = (type) => menuType === type;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [menuAction, setMenuAction] = useState('');

  const [targetEmail, setTargetEmail] = useState('');
  const [targetNumber, setTargetNumber] = useState('');

  const router = useRouter();

  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAction('');
  };

  const handleClickAction = (event, action) => {
    if (isMenuType('table-users')) {
      const userId = event.currentTarget.getAttribute('data-id');

      router.replace(`/admin/dashboard/users/${userId}/edit`);
    } else if (isMenuType('cards')) {
      setDialogOpen(true);

      if (email) {
        setTargetEmail(event.currentTarget.getAttribute('data-email'));
      } else {
        setTargetNumber(event.currentTarget.getAttribute('data-number'));
      }

      handleClose();
    }

    setMenuAction(action);
  };

  const getOptions = () => {
    return ACTION_OPTIONS[menuType] || ACTION_OPTIONS.default;
  };

  const renderMenuItems = () => {
    return getOptions().map((option) => {
      const dataAttributes = {
        'data-id': isMenuType('table-users') ? userId : null,
        'data-email': isMenuType('cards') && email ? email : null,
        'data-number':
          isMenuType('cards') && dialCode ? `${dialCode} ${phoneNumber}` : null,
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
  };

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
          aria-label="more"
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
          {renderMenuItems()}
        </Menu>
      </Box>

      {isDialogOpen && (
        <MenuActionDialog
          isDialogOpen={isDialogOpen}
          setDialogOpen={setDialogOpen}
          menuType={menuType}
          targetEmail={targetEmail}
          targetNumber={targetNumber}
          menuAction={menuAction}
          setMenuAction={setMenuAction}
        />
      )}
    </>
  );
};

export default MoreVertMenu;
