import { Drawer } from '@mui/material';
import { styled } from '@mui/system';

const drawerWidth = '100%';

export const StyledNavDrawer = styled(Drawer)({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    backgroundImage: 'none',
    height: '100vh',
  },
});
