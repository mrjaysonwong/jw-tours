import React, { useContext, useState } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Avatar,
  Grid,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  useTheme,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { usePathname } from 'next/navigation';
import { checkPath } from '@/utils/common';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import ConfirmationNumberOutlinedIcon from '@mui/icons-material/ConfirmationNumberOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import BookmarksOutlinedIcon from '@mui/icons-material/BookmarksOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

// proceed user section onClick UI/UX on NonMobile
// proceed profile settings

export function UserSectionMobile() {
  const session = useContext(UserSessionContext);
  const user = session?.user;

  const handleSignOut = () => {
    localStorage.setItem('signed-out', 'true');
    signOut();
  };

  return (
    <Box sx={{ py: 2 }}>
      <Box
        sx={{
          py: 1,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt="User Avatar Image"
          src={user?.image}
          referrerPolicy="no-referrer"
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography sx={{ ml: 2 }}>{user?.name}</Typography>
          <Typography sx={{ ml: 2 }}>{user?.email}</Typography>
        </Box>
      </Box>

      <Box
        sx={{
          py: 2,
          border: '1px solid var(--border-color)',
          borderWidth: '0px 0px 1px 0px',
        }}
      >
        <Grid container>
          <Grid item xs={6}>
            <Button fullWidth startIcon={<ConfirmationNumberOutlinedIcon />}>
              Bookings
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth startIcon={<WorkspacePremiumIcon />}>
              View Rewards
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth startIcon={<BookmarksOutlinedIcon />}>
              Wish List
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth startIcon={<SettingsOutlinedIcon />}>
              Settings
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ textAlign: 'right', py: 2 }}>
        <Button
          variant="contained"
          onClick={handleSignOut}
          startIcon={<LogoutOutlinedIcon />}
        >
          Sign Out
        </Button>
      </Box>
    </Box>
  );
}

export function UserSectionNonMobile() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  const session = useContext(UserSessionContext);
  const user = session?.user;

  const pathname = usePathname();
  const isAuthPage = checkPath(pathname);

  if (isAuthPage) {
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          right: '2rem',
          display: { xs: 'none', md: 'none', lg: 'flex' },
        }}
      >
        <IconButton
          onClick={handleClick}
          aria-controls={open ? 'profile-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          sx={{ p: 0 }}
        >
          <Avatar
            alt="User Avatar Image"
            src={user?.image}
            referrerPolicy="no-referrer"
            sx={{ width: 42, height: 42 }}
          />
        </IconButton>
      </Box>

      <Menu
        anchorEl={anchorEl}
        id="profile-menu"
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            mt: 1.5,
            bgcolor: isLightTheme
              ? 'var(--palette-light-main)'
              : 'var(--palette-dark2)',
            '& .MuiAvatar-root': {
              width: 42,
              height: 42,

              mr: 2,
            },
            '&::before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: isLightTheme
                ? 'var(--palette-light-main)'
                : 'var(--palette-dark2)',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
      >
        <MenuItem
          disableRipple
          sx={{
            cursor: 'text',
            '&:hover': {
              bgcolor: 'transparent',
            },
          }}
        >
          <Avatar
            alt="User Avatar Image"
            src={user?.image}
            referrerPolicy="no-referrer"
            sx={{ cursor: 'default' }}
          />
          <Box sx={{ userSelect: 'text' }}>
            <Typography>{user?.name}</Typography>
            <Typography variant="body2">{user?.email}</Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <ConfirmationNumberOutlinedIcon />
          </ListItemIcon>
          Bookings
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <WorkspacePremiumIcon />
          </ListItemIcon>
          View Rewards
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <BookmarksOutlinedIcon />
          </ListItemIcon>
          Wish List
        </MenuItem>
        <MenuItem
          onClick={() => {
            signOut(), handleClose();
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          Sign Out
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <SettingsOutlinedIcon />
          </ListItemIcon>
          Settings
        </MenuItem>
      </Menu>
    </>
  );
}
