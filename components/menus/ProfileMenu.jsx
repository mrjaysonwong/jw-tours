import React, { useContext, useState } from 'react';
import { useCookies } from 'react-cookie';
import { usePathname } from 'next/navigation';
import { signOut } from 'next-auth/react';
import {
  Box,
  Typography,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Divider,
} from '@mui/material';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

// internal imports
import { UserDataContext } from '@/contexts/UserProvider';
import { stripLocale } from '@/helpers/pageHelpers';
import MenuLinks from './MenuLinks';
import { SkeletonCircular } from '@/components/loaders/Skeletons';
import ProfileAvatar from '@/components/images/ProfileAvatar';

const ProfileMenu = () => {
  const { user, isLoading, isError } = useContext(UserDataContext);

  const primaryEmail = user?.email.find((e) => e.isPrimary === true);

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const [anchorEl, setAnchorEl] = useState(null);
  const [cookies, setCookie] = useCookies();

  const open = Boolean(anchorEl);
  const pathname = usePathname();
  const strippedPathname = stripLocale(pathname);
  const isAdminPath = strippedPathname.startsWith('/admin');

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOnClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    setCookie('signed-out', 'true', { path: '/' });
    signOut({ callbackUrl: strippedPathname });
    setAnchorEl(null);
  };

  if (isAdminPath && isLoading) {
    return <SkeletonCircular w={32} h={32} l={1} />;
  }

  return (
    <>
      <IconButton
        aria-controls={open ? 'profile-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleAvatarClick}
        sx={{ ml: 'auto' }}
      >
        <ProfileAvatar user={user} h={32} w={32} />
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
          <ProfileAvatar user={user} h={48} w={48} m={2} cursor="default" />

          <Box sx={{ userSelect: 'text' }}>
            {isError ? (
              <Typography color="error" variant="body2">
                Data error
              </Typography>
            ) : (
              <>
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {fullName}
                </Typography>
                <Typography variant="body2">{primaryEmail?.email}</Typography>
              </>
            )}
          </Box>
        </MenuItem>

        <Divider />

        <MenuLinks
          user={user}
          isAdminPath={isAdminPath}
          setAnchorEl={setAnchorEl}
        />

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
};

export default ProfileMenu;
