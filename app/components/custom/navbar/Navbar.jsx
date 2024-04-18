'use client';

import React, { useContext } from 'react';
import {
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
} from '@mui/material';
import Logo from './Logo';
import NavMenu from './menu/Menu';
import NavbarLinks from './links/Links';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { AuthButtonsNonMobile } from './auth-buttons/AuthButtons';
import { UserSectionNonMobile } from './user-section/UserSection';

function HideOnScroll(props) {
  const { children } = props;

  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children}
    </Slide>
  );
}

export default function Navbar(props) {
  const session = useContext(UserSessionContext);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <>
      {/* <HideOnScroll {...props}> */}
      <AppBar
        component="nav"
        color="inherit"
        elevation={1}
        sx={{ zIndex: 1250 }}
      >
        <Toolbar>
          <Logo />

          {mobileView ? (
            <>
              <NavMenu />
            </>
          ) : (
            <>
              <NavbarLinks />

              {session ? <UserSectionNonMobile /> : <AuthButtonsNonMobile />}
            </>
          )}
        </Toolbar>
      </AppBar>
      {/* </HideOnScroll> */}
      <Toolbar />
    </>
  );
}
