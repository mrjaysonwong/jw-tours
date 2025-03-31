import { useState } from 'react';
import { Toolbar, Box, IconButton, Drawer, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// internal imports
import { useDrawerStore } from '@/stores/drawerStore';
import { useNotificationStore } from '@/stores/notificationStore';
import NotificationsList from '@/app/(features)/notifications/NotificationsList';
import NotificationsMenu from '../menus/NotificationsMenu';

const MenuButton = ({ open, anchorEl, setAnchorEl }) => {
  const { hasError } = useNotificationStore();

  const handleClickButton = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <>
      <IconButton
        onClick={handleClickButton}
        sx={{ display: hasError ? 'none' : 'flex', ml: 1 }}
      >
        <MoreVertIcon />
      </IconButton>

      <NotificationsMenu
        open={open}
        anchorEl={anchorEl}
        setAnchorEl={setAnchorEl}
      />
    </>
  );
};

const DrawerList = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const { toggleDrawer } = useDrawerStore();

  return (
    <>
      <Toolbar
        sx={{ py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}
      >
        <Typography variant="h6">Notifications</Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
          <MenuButton
            open={open}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
          />

          <IconButton
            aria-label="close notifications drawer"
            onClick={() => toggleDrawer('notificationsDrawerOpen', false)}
            sx={{
              svg: {
                fontSize: { xs: '2rem', md: '1.5rem' },
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </Toolbar>

      <NotificationsList />
    </>
  );
};

const NotificationsSidebar = () => {
  const { notificationsDrawerOpen } = useDrawerStore();

  return (
    <>
      <Drawer
        hideBackdrop={true}
        variant="temporary"
        elevation={3}
        transitionDuration={300}
        anchor="right"
        open={notificationsDrawerOpen}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: { xs: '100%', sm: '50%', lg: '30%' },
            backgroundImage: 'none',
          },
        }}
      >
        <DrawerList />
      </Drawer>
    </>
  );
};

export default NotificationsSidebar;
