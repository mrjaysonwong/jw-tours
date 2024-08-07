'use client';

import React, { useContext, createContext } from 'react';
import {
  AppBar,
  Container,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
  Box,
} from '@mui/material';
import Logo from './Logo';
import NavMenuMobile from './nav-menu/NavMenuMobile';
import NavMenu from './nav-menu/NavMenu';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import ProfileMenu from './authenticate/ProfileMenu';
import ProfileMenuMobile from './authenticate/ProfileMenuMobile';
import { usePathname } from 'next/navigation';
import { authPage } from '@/utils/helper/common';
import { useUserData } from '@/utils/hooks/useUserData';
import { LoadingSkeletonAvatar } from '@/app/components/custom/loaders/Skeleton';
import AuthButton from './AuthButton';
import AddToCart from './AddToCart';
import Notifications from './Notifications';
import { ErrorTooltip } from '../custom/error';


export const UserDataContext = createContext(null);

function HideOnScroll({ children }) {
  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children}
    </Slide>
  );
}

export default function NavBar() {
  const session = useContext(UserSessionContext);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('lg'));

  const pathname = usePathname();
  const isAuthPage = authPage(pathname);

  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useUserData(session?.user?.id);

  const values = {
    session,
    user,
    isLoading,
    isError,
    error,
  };

  return (
    <>
      <HideOnScroll>
        <AppBar
          component="nav"
          color="inherit"
          position={isAuthPage ? 'absolute' : undefined}
          elevation={isAuthPage ? 0 : 1}
        >
          <Container
            sx={{
              display: 'flex',
              alignItems: 'center',
           
            }}
          >
            <Logo />

            {!mobileView && <NavMenu />}

            <Box
              sx={{
                display: isAuthPage ? 'none' : 'flex',
                alignItems: 'center',
                ml: 'auto',
              }}
            >
              <AddToCart />

              {session ? (
                <>
                  <UserDataContext.Provider value={values}>
                    <Notifications />

                    {isLoading ? (
                      <LoadingSkeletonAvatar w={32} h={32} />
                    ) : mobileView ? (
                      isError ? (
                        <ErrorTooltip />
                      ) : (
                        <ProfileMenuMobile />
                      )
                    ) : isError ? (
                      <ErrorTooltip />
                    ) : (
                      <ProfileMenu />
                    )}
                  </UserDataContext.Provider>
                </>
              ) : (
                <AuthButton />
              )}

              <NavMenuMobile />
            </Box>
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
