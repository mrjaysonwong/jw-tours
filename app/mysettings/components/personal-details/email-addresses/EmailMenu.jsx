import { useContext, useState } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Card,
  Grid,
  Skeleton,
  Button,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PersonalSettingsContext } from '../PersonalDetails';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

const options = [
  { label: 'Set as Primary', action: 'setPrimary' },
  { label: 'Delete', action: 'delete' },
];

export default function EmailMenu({ primaryEmail }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClickMoreVert = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const filteredOptions = options.filter(
    (option) => !primaryEmail || option.action !== 'setPrimary'
  );
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
          {filteredOptions.map((option) => (
            <MenuItem
              key={option.action}
              onClick={
                option.action === 'setPrimary'
                  ? handleClickMoreVert
                  : handleClickMoreVert
              }
            >
              {option.label}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </>
  );
}
