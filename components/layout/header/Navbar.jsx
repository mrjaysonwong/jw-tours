// 'use client';

// import { UserDataProvider } from '@/contexts/UserProvider';
// import Navbar from './Navbar';

// export default function Header() {
//   return (
//     <header>
//       <UserDataProvider>
//         <Navbar />
//       </UserDataProvider>
//     </header>
//   );
// }

'use client';

// third-party imports
import React, { useState, useContext, createContext } from 'react';
import { usePathname } from 'next/navigation';
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  Slide,
  useScrollTrigger,
  IconButton,
} from '@mui/material';
import { useTranslations } from 'next-intl';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

// internal imports
import {
  UserSessionContext,
  UserDataContext,
  UserDataProvider,
} from '@/contexts/UserProvider';
import Logo from './Logo';
import TopNavLinks from './TopNavLinks';
import { navLinks } from '@/data/links/navLinks';
import AuthFormDialog from '@/app/(features)/authentication/AuthFormDialog';
import { StyledNavIconsContainer } from '@/components/styled/StyledContainers';
import NavDrawer from './NavDrawer';
import { useNavDrawerStore } from '@/stores/drawerStore';
import { SkeletonCircular } from '@/components/loaders/Skeletons';
import ProfileMenu from '@/components/menus/ProfileMenu';
import {
  shouldHideOnAuthPage,
  shouldHideNavLinks,
} from '@/helpers/pageHelpers';

export const DialogContext = createContext({});

const HideOnScroll = ({ children }) => {
  const trigger = useScrollTrigger({ threshold: 200 });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export const NavLogo = () => {
  return (
    <Box sx={{ mr: 3, my: 1 }}>
      <Logo />
    </Box>
  );
};

const SessionIconButtons = ({ open }) => (
  <>
    <IconButton>
      <FavoriteBorderOutlinedIcon />
    </IconButton>

    <IconButton
      aria-controls={open ? 'cart-drawer' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    >
      <ShoppingCartOutlinedIcon />
    </IconButton>

    <IconButton
      aria-controls={open ? 'notifications-drawer' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
    >
      <NotificationsNoneOutlinedIcon />
    </IconButton>

    <ProfileMenu />
  </>
);

const IconButtons = ({ handleIconAuthClick }) => (
  <>
    <IconButton>
      <FavoriteBorderOutlinedIcon />
    </IconButton>

    <IconButton>
      <ShoppingCartOutlinedIcon />
    </IconButton>

    <IconButton
      onClick={handleIconAuthClick}
      aria-label="open auth dialog tabs, Sign In and Sign Up"
    >
      <AccountCircleOutlinedIcon />
    </IconButton>
  </>
);

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const session = useContext(UserSessionContext);
  const { isLoading } = useContext(UserDataContext);

  const pathname = usePathname();
  const isAuthPage = shouldHideOnAuthPage(pathname);
  const isMySettingsPage = shouldHideNavLinks(pathname);

  const t = useTranslations('main_nav_links');
  const linksTransLations = navLinks(t);

  const { toggleNavDrawer } = useNavDrawerStore();

  const handleIconAuthClick = () => {
    setOpen(true);
  };

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <UserDataProvider>
        <header>
          <HideOnScroll>
            <AppBar
              component="nav"
              position="fixed"
              elevation={1}
              color="inherit"
            >
              <Container
                sx={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Toolbar
                  sx={{
                    width: '100vw',
                    px: { xs: 0, md: 'auto' },
                  }}
                >
                  <NavLogo />

                  <Box
                    sx={{
                      overflowX: 'auto',
                      display: {
                        xs: 'none',
                        md: isMySettingsPage ? 'none' : 'flex',
                      },
                    }}
                  >
                    <TopNavLinks linksTransLations={linksTransLations} />
                  </Box>

                  <StyledNavIconsContainer>
                    {session ? (
                      isLoading ? (
                        <SkeletonCircular w={32} h={32} l={4} />
                      ) : (
                        <SessionIconButtons open={open} />
                      )
                    ) : (
                      <IconButtons handleIconAuthClick={handleIconAuthClick} />
                    )}

                    <IconButton
                      aria-label="open nav drawer"
                      onClick={() => toggleNavDrawer('right', true)}
                      sx={{
                        display: isMySettingsPage
                          ? 'none'
                          : { sm: 'flex', md: 'none' },
                      }}
                    >
                      <MenuIcon />
                    </IconButton>
                  </StyledNavIconsContainer>
                </Toolbar>
              </Container>
            </AppBar>
          </HideOnScroll>
        </header>

        <NavDrawer linksTransLations={linksTransLations} />

        {open && !session && (
          <DialogContext.Provider value={{ open, setOpen }}>
            <AuthFormDialog />
          </DialogContext.Provider>
        )}
      </UserDataProvider>
    </>
  );
};

export default Navbar;
