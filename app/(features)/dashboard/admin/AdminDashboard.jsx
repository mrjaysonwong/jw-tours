'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  IconButton,
  Container,
  Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

// internal imports
import ProfileMenu from '@/components/menus/ProfileMenu';
import {
  dashboardComponents,
  dashboardEditComponents,
} from '@/constants/componentMaps/componentMaps';
import { stripLocale } from '@/helpers/pageHelpers';
import { UserDataProvider } from '@/contexts/UserProvider';
import NavDrawer from './NavDrawer';
import { getLastSegment } from '@/helpers/pageHelpers';
import HideOnScroll from '@/components/common/HideOnScroll';

const drawerWidth = 260;

export default function AdminDashboard({ categorySlug, actionSlug, slug }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const pathname = usePathname();
  const overview = stripLocale(pathname) === '/admin/dashboard';

  const lastSegment = getLastSegment(pathname);

  const componentKey = overview
    ? 'overview'
    : actionSlug
    ? `${categorySlug}_${actionSlug}`
    : categorySlug;

  const componentEditKey = `${slug}_${lastSegment}`;

  const currentComponent =
    dashboardComponents[componentKey] ||
    dashboardEditComponents[componentEditKey] ||
    null;

  const handleDrawerToggle = () => {
    if (!isClosing) setMobileOpen(!mobileOpen);
  };

  return (
    <>
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
            <Toolbar sx={{ py: 1, svg: { fontSize: '2rem' } }}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{
                  mr: 2,
                  display: { md: 'none' },
                }}
              >
                <MenuIcon />
              </IconButton>

              <Box sx={{ ml: 'auto' }}>
                <IconButton>
                  <Badge
                    badgeContent={4}
                    color="error"
                    sx={{
                      '& .MuiBadge-badge': {
                        right: 5,
                      },
                    }}
                  >
                    <NotificationsNoneOutlinedIcon />
                  </Badge>
                </IconButton>

                <UserDataProvider>
                  <ProfileMenu />
                </UserDataProvider>
              </Box>
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
            width: { xs: `calc(100% - ${drawerWidth}px)` },

            h5: {
              my: 2,
              fontWeight: 550,
            },
          }}
        >
          {currentComponent && React.createElement(currentComponent)}
        </Container>
      </Box>
    </>
  );
}
