import React, { useContext, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  ListItemIcon,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// local imports
import { UserDataContext } from '@/contexts/UserProvider';
import { profileMenuLinks } from '@/data/links/profileMenuLinks';

export default function ProfileMenu() {
  const { user, isError } = useContext(UserDataContext);
  const primaryEmail = user?.email.find((e) => e.isPrimary === true);

  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const pathname = usePathname();

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleItemClick = (href) => {
    router.push(href);
    setAnchorEl(null);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    localStorage.setItem('signed-out', 'true');
    signOut({ callbackUrl: pathname });
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleAvatarClick}
      >
        <Avatar
          alt={`${user?.firstName} ${user?.lastName}`}
          src={user?.image?.url ?? '/assets/fallback_avatar.svg'}
          referrerPolicy="no-referrer"
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        className="profile-menu"
        open={open}
        onClose={handleOnClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            elevation: 3,
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
            src={user?.image?.url ?? '/assets/fallback_avatar.svg'}
            referrerPolicy="no-referrer"
            sx={{ cursor: 'default', mr: 2, height: 48, width: 48 }}
          />
          <Box sx={{ userSelect: 'text' }}>
            {isError ? (
              <Typography color="error" variant="body2">
                Data error
              </Typography>
            ) : (
              <>
                <Typography>
                  {user?.firstName} {user?.lastName}
                </Typography>
                <Typography variant="body2">{primaryEmail?.email}</Typography>
              </>
            )}
          </Box>
        </MenuItem>
        <Divider />

        {profileMenuLinks.map(({ label, href, icon }) => (
          <MenuItem key={label} onClick={() => handleItemClick(href)}>
            <ListItemIcon>{icon}</ListItemIcon>
            {label}
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
