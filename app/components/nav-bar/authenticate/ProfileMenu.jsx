import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem,
  Divider,
  useTheme,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { UserDataContext } from '../NavBar';
import { usePathname } from 'next/navigation';
import { authPage } from '@/utils/helper/common';
import { profileMenuLinks } from '@/src/navigation-links/profileMenuLinks';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  const { user } = useContext(UserDataContext);
  const primaryEmail = user?.email.find((e) => e.isPrimary === true);

  const pathname = usePathname();
  const isAuthPage = authPage(pathname);

  if (isAuthPage) {
    return null;
  }

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (path) => {
    router.push(path);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    localStorage.setItem('signed-out', 'true');
    signOut({ callbackUrl: '/signin' });
    setAnchorEl(null);
  };

  return (
    <>
      <Box
        sx={{
          ml: 'auto',
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
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.image?.url ?? '/assets/user.png'}
            referrerPolicy="no-referrer"
            sx={{ width: 32, height: 32 }}
          />
        </IconButton>
      </Box>

      <Menu
        disableScrollLock={true}
        anchorEl={anchorEl}
        id="profile-menu"
        className="profile-menu"
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
              : 'var(--palette-dark)',
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
                : 'var(--palette-dark)',
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
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.image?.url ?? '/assets/user.png'}
            referrerPolicy="no-referrer"
            sx={{ cursor: 'default' }}
          />
          <Box sx={{ userSelect: 'text' }}>
            <Typography>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="body2">{primaryEmail?.email}</Typography>
          </Box>
        </MenuItem>
        <Divider />

        {profileMenuLinks.map((item) => (
          <MenuItem
            key={item.pathName}
            onClick={() => handleItemClick(item.path)}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            {item.pathName}
          </MenuItem>
        ))}

        <Divider />

        <MenuItem onClick={handleSignOut}>
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}
