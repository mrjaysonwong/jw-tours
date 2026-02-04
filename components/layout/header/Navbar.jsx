'use client';

// third-party imports
import React, { useContext, useEffect, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import { AppBar, Toolbar, Box, IconButton, Container } from '@mui/material';
import { useTranslations } from 'next-intl';
import MenuIcon from '@mui/icons-material/Menu';

// internal imports
import { UserSessionContext, UserDataContext } from '@/contexts/UserProvider';
import Logo from './Logo';
import HideOnScroll from '@/components/common/HideOnScroll';
import TopNavLinks from './TopNavLinks';
import { navLinks } from '@/data/links/navLinks';
import AuthFormDialog from '@/app/(features)/authentication/AuthFormDialog';
import { StyledNavIconsContainer } from '@/components/styled/StyledContainers';
import NavDrawer from './NavDrawer';
import Currency from '@/components/layout/header/Currency';
import { useDrawerStore } from '@/stores/drawerStore';
import { SkeletonCircular } from '@/components/loaders/Skeletons';
import {
  shouldHideOnAuthPage,
  shouldHideNavLinks,
} from '@/helpers/pageHelpers';
import { listenForNotifications } from '@/services/notifications/notificationActions';
import { useMessageStore } from '@/stores/messageStore';
import IconButtons from './IconButtons';
import SessionIconButtons from './SessionIconButtons';
import { useNotificationStore } from '@/stores/notificationStore';
import SearchBar from './SearchBar';
import { useAuthDialogStore } from '@/stores/dialogStore';
import SearchDrawer from './SearchDialog';

const Navbar = ({ currency }) => {
  const { isAuthDialogOpen } = useAuthDialogStore();

  const session = useContext(UserSessionContext);

  const {
    setNotifications,
    isNotificationLoading,
    setIsNotificationLoading,
    setLastDoc,
    setHasError,
  } = useNotificationStore();

  const { isLoading: isSessionLoading } = useContext(UserDataContext);

  const pathname = usePathname();
  const isAuthPage = shouldHideOnAuthPage(pathname);
  const isMySettingsPage = shouldHideNavLinks(pathname);

  const t = useTranslations('main_nav_links');
  const linksTransLations = navLinks(t);

  const { toggleDrawer } = useDrawerStore();
  const { handleAlertMessage } = useMessageStore();

  const fetchNotifications = useCallback(() => {
    if (!session?.user?.id) return;

    const unsubscribed = listenForNotifications(
      session.user.id,
      (newNotifications, lastVisible) => {
        setNotifications(newNotifications);
        setLastDoc(lastVisible);
        setIsNotificationLoading(false);

        const newNotification = newNotifications[0];

        if (newNotification) {
          const currentTime = new Date();
          const notificationTime = new Date(
            newNotification.createdAt.seconds * 1000
          );

          // Calculate the difference in milliseconds
          const timeDifference = Math.abs(
            notificationTime.getTime() - currentTime.getTime()
          );

          const tolerance = 15000;

          if (timeDifference <= tolerance && session.user.role !== 'admin') {
            handleAlertMessage(
              newNotification.title,
              'info',
              'center',
              'top',
              newNotification.template.toUpperCase(),
              8000
            );
          }
        }
      },
      (error) => {
        handleAlertMessage('Error loading notifications', 'error');
        setIsNotificationLoading(false);
        setHasError(true);
      }
    );

    return unsubscribed;
  }, [
    session,
    setIsNotificationLoading,
    handleAlertMessage,
    setLastDoc,
    setNotifications,
    setHasError,
  ]);

  useEffect(() => {
    const unsubscribed = fetchNotifications();

    return () => {
      if (unsubscribed) unsubscribed();
    };
  }, [fetchNotifications]);

  const isLoading = isSessionLoading || isNotificationLoading;

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <header>
        <HideOnScroll>
          <AppBar
            component="nav"
            position="fixed"
            elevation={1}
            color="inherit"
          >
            <Container>
              <Toolbar
                sx={{
                  px: { xs: 0, md: 'auto' },
                }}
              >
                <Logo />

                {/* <Box
                  sx={{
                    overflowX: 'auto',
                    display: {
                      xs: 'none',
                      md: isMySettingsPage ? 'none' : 'flex',
                    },
                  }}
                >
                  <TopNavLinks linksTransLations={linksTransLations} />
                </Box> */}

                <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                  <SearchBar />
                </Box>

                <StyledNavIconsContainer>
                  <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                    <SearchDrawer />
                  </Box>

                  <Currency currency={currency} />

                  {session ? (
                    isLoading ? (
                      <SkeletonCircular w={32} h={32} l={3} />
                    ) : (
                      <SessionIconButtons />
                    )
                  ) : (
                    <IconButtons />
                  )}

                  {/* <IconButton
                    aria-label="open nav drawer"
                    onClick={() => toggleDrawer('navDrawerOpen', true)}
                    sx={{
                      display: isMySettingsPage
                        ? 'none'
                        : { sm: 'flex', md: 'none' },
                    }}
                  >
                    <MenuIcon />
                  </IconButton> */}
                </StyledNavIconsContainer>
              </Toolbar>
            </Container>
          </AppBar>
        </HideOnScroll>
      </header>

      {/* <NavDrawer linksTransLations={linksTransLations} /> */}

      {isAuthDialogOpen && !session && <AuthFormDialog />}
    </>
  );
};

export default Navbar;
