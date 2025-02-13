'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Container,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

// internal imports
import ProfileMenu from '@/components/menus/ProfileMenu';
import { dashboardComponents } from '@/config/uiComponents';
import { stripLocale } from '@/helpers/pageHelpers';
import { UserDataProvider } from '@/contexts/UserProvider';
import NavDrawer from './NavDrawer';
import { getLastSegment } from '@/helpers/pageHelpers';

const drawerWidth = 280;

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ threshold: 200 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default function AdminDashboard({ slug }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const pathname = usePathname();
  const overview = stripLocale(pathname) === '/admin/dashboard';

  const lastSegment = getLastSegment(pathname);

  const currentComponent = overview
    ? dashboardComponents.overview
    : dashboardComponents[slug || lastSegment] || null;

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100dvh' }}>
      <HideOnScroll>
        <AppBar
          color="inherit"
          elevation={0}
          position="fixed"
          sx={{
            width: { md: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { md: 'none' }, svg: { fontSize: '2rem' } }}
            >
              <MenuIcon />
            </IconButton>

            <UserDataProvider>
              <ProfileMenu />
            </UserDataProvider>
          </Toolbar>
        </AppBar>
      </HideOnScroll>

      <NavDrawer
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        setIsClosing={setIsClosing}
        drawerWidth={drawerWidth}
      />

      <Container
        component="main"
        sx={{
          minHeight: '100dvh',
          flexGrow: 1,
          p: 2,
          mt: 7,
          mx: { lg: 1 },
          width: { xs: `calc(100% - ${drawerWidth}px)` },

          h5: {
            my: 2,
          },
        }}
      >
        {currentComponent && React.createElement(currentComponent)}
      </Container>
    </Box>
  );
}
