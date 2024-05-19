import React, { useContext, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  IconButton,
  Avatar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Divider,
  useTheme,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { usePathname } from 'next/navigation';
import { authPage } from '@/utils/helper/common';
import { userSectionRoutes } from '@/src/routes/user-section-routes';
import { useNavDrawerStore } from '@/stores/drawerStore';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseIcon from '@mui/icons-material/Close';

const drawerWidth = '100%';

export function ProfileMenuDrawerMobile() {
  const session = useContext(UserSessionContext);
  const router = useRouter();

  const { state, toggleNavDrawer } = useNavDrawerStore();

  const handleClick = (path) => {
    toggleNavDrawer('right', false);
    router.push(path);
  };

  const handleSignOut = () => {
    localStorage.setItem('signed-out', 'true');
    signOut({ callbackUrl: '/signin' });
  };

  const DrawerList = (
    <Box role="presentation">
      <IconButton
        onClick={() => toggleNavDrawer('right', false)}
        sx={{ position: 'absolute', top: 12, right: 15, color: 'inherit' }}
      >
        <CloseIcon />
      </IconButton>

      <Box
        sx={{
          mt: 3,
          p: 3,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Avatar
          alt={`${session?.user?.name} profile image`}
          src={session?.user?.image}
          referrerPolicy="no-referrer"
          sx={{ width: 56, height: 56 }}
        />
        <Box>
          <Typography sx={{ ml: 2, userSelect: 'all' }}>
            {session?.user?.name}
          </Typography>
          <Typography sx={{ ml: 2, userSelect: 'all' }}>
            {session?.user?.email}
          </Typography>
        </Box>
      </Box>

      <List sx={{ px: 3 }}>
        {userSectionRoutes.map((item) => (
          <ListItem key={item.pathName} disablePadding>
            <ListItemButton onClick={() => handleClick(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.pathName} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List sx={{ px: 3 }}>
        <ListItem disablePadding>
          <ListItemButton onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Drawer
      hideBackdrop={true}
      variant="temporary"
      transitionDuration={0}
      anchor="right"
      open={state['right']}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          minWidth: drawerWidth,
          backgroundImage: 'none',
        },
      }}
    >
      {DrawerList}
    </Drawer>
  );
}

export function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const open = Boolean(anchorEl);

  const theme = useTheme();
  const isLightTheme = theme.palette.mode === 'light';

  const session = useContext(UserSessionContext);

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
          sx={{ p: 0.5, bgcolor: 'var(--icon-bgcolor)' }}
        >
          <Avatar
            alt={`${session?.user?.name}`}
            src={session?.user?.image}
            referrerPolicy="no-referrer"
            sx={{ width: 38, height: 38 }}
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
            alt={`${session?.user?.name} profile image`}
            src={session?.user?.image}
            referrerPolicy="no-referrer"
            sx={{ cursor: 'default' }}
          />
          <Box sx={{ userSelect: 'text' }}>
            <Typography>{session?.user?.name}</Typography>
            <Typography variant="body2">{session?.user?.email}</Typography>
          </Box>
        </MenuItem>
        <Divider />

        {userSectionRoutes.map((item) => (
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
