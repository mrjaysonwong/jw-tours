import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
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
  Divider,
} from '@mui/material';
import { signOut } from 'next-auth/react';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { profileMenuLinks } from '@/src/navigation-links/profileMenuLinks';
import { useNavDrawerStore } from '@/stores/drawerStore';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useUserData } from '@/utils/hooks/useUserData';

const drawerWidth = '100%';

export default function ProfileMenuMobile() {
  const session = useContext(UserSessionContext);
  const router = useRouter();

  const { state, toggleNavDrawer } = useNavDrawerStore();

  const { data: user } = useUserData(session?.user?.id);
  const fullName = `${user?.firstName} ${user?.lastName}`;

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
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            height: '88px',
          }}
        >
          <IconButton
            aria-label="close-profile-menu"
            onClick={() => toggleNavDrawer('right', false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Avatar
            alt={`${session?.user?.name} profile image`}
            src={user?.image?.url ?? session?.user?.image}
            referrerPolicy="no-referrer"
            sx={{ width: 56, height: 56 }}
          />
          <Box sx={{ py: 2 }}>
            <Typography sx={{ ml: 2, userSelect: 'all' }}>
              {session?.user?.name}
            </Typography>
            <Typography sx={{ ml: 2, userSelect: 'all' }}>
              {session?.user?.email}
            </Typography>
          </Box>
        </Box>

        <Divider />

        <List>
          {profileMenuLinks.map((item) => (
            <ListItem key={item.pathName} disablePadding>
              <ListItemButton onClick={() => handleClick(item.path)}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.pathName} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <Divider />

        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleSignOut}>
              <ListItemIcon>
                <LogoutOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
    </Box>
  );

  return (
    <>
      <IconButton
        disableRipple
        aria-label="profile-menu"
        onClick={() => toggleNavDrawer('right', true)}
        sx={{ p: 0 }}
      >
        <Avatar
          alt={`${fullName ?? session?.user?.name}`}
          src={user?.image?.url ?? session?.user?.image}
          referrerPolicy="no-referrer"
          sx={{ width: 32, height: 32 }}
        />
      </IconButton>

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
    </>
  );
}
