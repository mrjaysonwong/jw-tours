import { Drawer } from '@mui/material';

// internal imports
import { useDrawerStore } from '@/stores/drawerStore';
import DrawerLinks from './DrawerLinks';

const drawerWidth = '100%';

const NavDrawer = ({ linksTransLations }) => {
  const { navDrawerOpen, toggleDrawer } = useDrawerStore();

  return (
    <Drawer
      // closeAfterTransition={true}
      hideBackdrop={true}
      variant="temporary"
      transitionDuration={300}
      anchor="right"
      open={navDrawerOpen}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          backgroundImage: 'none',
          height: '100vh',
        },
      }}
    >
      <DrawerLinks
        toggleDrawer={toggleDrawer}
        linksTransLations={linksTransLations}
      />
    </Drawer>
  );
};

export default NavDrawer;
