import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// local imports
import MenuActionDialog from '../dialogs/MenuActionDialog';

const options = [
  { label: 'Set as Primary', action: 'set-primary' },
  { label: 'Delete', action: 'delete' },
];

export default function CardMenu(props) {
  const { email, dialCode, phoneNumber } = props;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [isDialogOpen, setDialogOpen] = useState(false);
  const [menuAction, setMenuAction] = useState('');

  const [targetEmail, setTargetEmail] = useState('');
  const [targetNumber, setTargetNumber] = useState('');

  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAction('');
  };

  const handleClickAction = (event, action, type) => {
    if (type === 'email') {
      setTargetEmail(event.currentTarget.getAttribute('data-email'));
    } else {
      setTargetNumber(event.currentTarget.getAttribute('data-number'));
    }

    setMenuAction(action);
    setDialogOpen(true);
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
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
          {email
            ? options.map((option) => (
                <MenuItem
                  data-email={email}
                  key={option.action}
                  onClick={(event) =>
                    handleClickAction(event, option.action, 'email')
                  }
                >
                  {option.label}
                </MenuItem>
              ))
            : options.map((option) => (
                <MenuItem
                  data-number={`${dialCode} ${phoneNumber}`}
                  key={option.action}
                  onClick={(event) =>
                    handleClickAction(event, option.action, 'mobile')
                  }
                >
                  {option.label}
                </MenuItem>
              ))}
        </Menu>
      </Box>

      <MenuActionDialog
        open={isDialogOpen}
        setOpen={setDialogOpen}
        targetEmail={targetEmail}
        targetNumber={targetNumber}
        menuAction={menuAction}
        setMenuAction={setMenuAction}
      />
    </>
  );
}
