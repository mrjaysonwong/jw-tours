import { Box, Drawer, useTheme } from '@mui/material';

// internal imports
import NavLinks from './NavLinks';

export default function NavDrawer({
  mobileOpen,
  setMobileOpen,
  setIsClosing,
  drawerWidth,
}) {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  return (
    <Box
      component="nav"
      sx={{ width: { md: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="drawer nav"
    >
      <Drawer
        elevation={0}
        variant="temporary"
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            overflowY: 'unset !important',
            bgcolor: isDarkMode && 'var(--color-dark-secondary)',
          },
        }}
      >
        <NavLinks />
      </Drawer>

      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            overflowY: 'unset !important',
            bgcolor: isDarkMode && 'var(--color-dark-secondary)',
            border: 'none',
          },
        }}
      >
        <NavLinks />
      </Drawer>
    </Box>
  );
}
