'use client';

import React, { useContext } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Container,
  useTheme,
  useMediaQuery,
  Slide,
  useScrollTrigger,
  Box,
  IconButton,
  Avatar,
  Badge,
} from '@mui/material';
import Logo from './Logo';
import NavMenu from './menu/Menu';
import NavbarLinks from './links/Links';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { AuthButtonsNonMobile } from './auth-buttons/AuthButtons';
import {
  ProfileMenu,
  ProfileMenuDrawerMobile,
} from './user-section/UserSection';
import { usePathname } from 'next/navigation';
import { authPage } from '@/utils/helper/common';
import { useNavDrawerStore } from '@/stores/drawerStore';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import { useCookies } from 'react-cookie';

function HideOnScroll({ children }) {
  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const session = useContext(UserSessionContext);

  const theme = useTheme();
  const mobileView = useMediaQuery(theme.breakpoints.down('lg'));

  const pathname = usePathname();
  const isAuthPage = authPage(pathname);

  const { toggleNavDrawer } = useNavDrawerStore();

  const [cookies] = useCookies(['not-found']);

  if (cookies['not-found']) {
    return null;
  }

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

            {mobileView ? (
              !isAuthPage && (
                <Box
                  sx={{
                    ml: 'auto',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {session ? (
                    <>
                      <IconButton
                        aria-label="profile-menu"
                        onClick={() => toggleNavDrawer('right', true)}
                      >
                        <Avatar
                          alt={`${session?.user?.name}`}
                          src={session?.user?.image}
                          referrerPolicy="no-referrer"
                          sx={{ width: 32, height: 32 }}
                        />
                      </IconButton>

                      <ProfileMenuDrawerMobile />
                    </>
                  ) : (
                    <Link href="/signin" replace>
                      <IconButton>
                        <Badge
                          color="error"
                          overlap="circular"
                          badgeContent=" "
                          variant="dot"
                        >
                          <AccountCircleOutlinedIcon
                            sx={{ fontSize: '32px' }}
                          />
                        </Badge>
                      </IconButton>
                    </Link>
                  )}

                  <NavMenu />
                </Box>
              )
            ) : (
              <>
                <NavbarLinks />

                {session ? <ProfileMenu /> : <AuthButtonsNonMobile />}
              </>
            )}
          </Container>
        </AppBar>
      </HideOnScroll>
    </>
  );
}
