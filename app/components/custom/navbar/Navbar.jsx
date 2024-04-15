'use client';

import React, { useContext } from 'react';
import { AppBar, Toolbar } from '@mui/material';
import Logo from './Logo';
import NavMenu from './menu/Menu';
import NavbarLinks from './links/Links';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { AuthButtonsNonMobile } from './auth-buttons/AuthButtons';
import { UserSectionNonMobile } from './user-section/UserSection';

export default function Nav() {
  const session = useContext(UserSessionContext);

  return (
    <>
      <AppBar
        elevation={0}
        color="inherit"
        component="nav"
        sx={{ zIndex: 1250 }}
      >
        <Toolbar>
          <Logo />

          <NavbarLinks />
          {session ? <UserSectionNonMobile /> : <AuthButtonsNonMobile />}

          <NavMenu />
        </Toolbar>
      </AppBar>
    </>
  );
}
