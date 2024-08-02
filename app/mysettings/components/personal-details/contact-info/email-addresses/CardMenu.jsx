import React, { useState } from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';
import CardMenuAction from './CardMenuAction';

const options = [
  { label: 'Set as Primary', action: 'set-primary' },
  { label: 'Delete', action: 'delete' },
];

export default function CardMenu({ email }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const [openAction, setOpenAction] = useState(false);
  const [menuAction, setMenuAction] = useState('');

  const [targetEmail, setTargetEmail] = useState('');

  const { handleAlertMessage } = useMessageStore();

  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuAction('');
  };

  const handleClick = async (event, action) => {
    try {
      setTargetEmail(event.currentTarget.getAttribute('data-email'));

      if (action === 'delete') {
        setMenuAction(action);
        setOpenAction(true);
        setAnchorEl(null);
      } else if (action === 'set-primary') {
        setMenuAction(action);
        setOpenAction(true);
        setAnchorEl(null);
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
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
          {options.map((option) => (
            <MenuItem
              data-email={email}
              key={option.action}
              onClick={(event) => handleClick(event, option.action)}
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>

      {openAction && (
        <CardMenuAction
          open={openAction}
          setOpen={setOpenAction}
          targetEmail={targetEmail}
          menuAction={menuAction}
          setMenuAction={setMenuAction}
        />
      )}
    </>
  );
}
