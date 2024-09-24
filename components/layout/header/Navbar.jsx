import React, { useState, useContext, createContext, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import {
  AppBar,
  Box,
  IconButton,
  Container,
  Button,
  Slide,
  useScrollTrigger,
  Paper,
  Grid,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// local imports
import { UserSessionContext, UserDataContext } from '@/contexts/UserProvider';
import { SkeletonCircular } from '@/components/loaders/Skeletons';
import {
  StyledNavIconsContainer,
  StyledNavLinksContainer,
} from '@/components/styled/StyledContainers';
import { navLinks } from '@/data/links/navLinks';
import { useNavDrawerStore } from '@/stores/drawerStore';
import {
  shouldHideOnAuthPage,
  shouldHideNavLinks,
} from '@/helpers/pageHelpers';
import Logo from './Logo';
import NavDrawer from './NavDrawer';
import ProfileMenu from '@/app/(features)/user-profile/components/ProfileMenu';
import AuthFormDialog from '@/app/(features)/authentication/components/AuthFormDialog';

export const DialogContext = createContext(null);

function HideOnScroll({ children }) {
  return (
    <Slide appear={false} direction="down" in={!useScrollTrigger()}>
      {children}
    </Slide>
  );
}

export default function Navbar() {
  const session = useContext(UserSessionContext);
  const { isLoading } = useContext(UserDataContext);

  const [open, setOpen] = useState(false);

  const [selectedLabel, setSelectedLabel] = useState(null);
  const [dropDownOpen, setDropdownOpen] = useState(null);

  const pathname = usePathname();
  const isHomePage = pathname === '/';
  const params = useParams();

  const isAuthPage = shouldHideOnAuthPage(pathname);
  const isMySettingsPage = shouldHideNavLinks(pathname, params);

  const [hasReachedPosition, setHasReachedPosition] = useState(false);

  const targetScrollY = 10;

  const t = useTranslations('main_nav_links');
  const linksTransLations = navLinks(t);

  const { toggleNavDrawer, handleClose } = useNavDrawerStore();

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleMouseEnter = (label) => {
    setSelectedLabel(label);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setSelectedLabel(null);
    setDropdownOpen(null);
  };

  const handleClick = () => {
    setDropdownOpen(null);
    setSelectedLabel(null);
  };

  const handleAuthClick = () => {
    setOpen(true);
    handleClose;
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= targetScrollY) {
        setHasReachedPosition(true);
      } else {
        setHasReachedPosition(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [targetScrollY]);

  const links = () => {
    const renderEndIcon = (label) =>
      dropDownOpen && selectedLabel === label ? <ExpandLess /> : <ExpandMore />;

    return (
      <StyledNavLinksContainer>
        {linksTransLations.map((item) => {
          const { label, href, dropDownMenu } = item;

          if (dropDownMenu) {
            return (
              <Box
                key={label}
                className="dropdown"
                onMouseEnter={() => handleMouseEnter(label)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  className="dropbtn"
                  disableRipple
                  endIcon={renderEndIcon(label)}
                  sx={{
                    color:
                      dropDownOpen && selectedLabel === label
                        ? 'white !important'
                        : 'inherit',
                    bgcolor:
                      dropDownOpen && selectedLabel === label
                        ? 'var(--color-green-light)'
                        : 'inherit',
                  }}
                >
                  {label}
                </Button>

                {dropDownOpen && (
                  <Paper
                    className={'dropdown-content'}
                    sx={{ borderRadius: '0px 0px 6px 6px' }}
                  >
                    <Grid container>
                      {item.dropDownMenu
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map(({ label, href }) => (
                          <Grid key={label} item md={6}>
                            <Link href={href} onClick={handleClick}>
                              {label}
                            </Link>
                          </Grid>
                        ))}
                    </Grid>
                  </Paper>
                )}
              </Box>
            );
          } else {
            return (
              <Link key={label} href={href}>
                <Button disableRipple>{label}</Button>
              </Link>
            );
          }
        })}
      </StyledNavLinksContainer>
    );
  };

  if (isAuthPage) {
    return null;
  }

  return (
    <>
      <HideOnScroll>
        <AppBar
          component="nav"
          color="inherit"
          elevation={pathname === '/' && !hasReachedPosition ? 0 : 1}
          sx={{
            background: hasReachedPosition
              ? undefined
              : isHomePage
              ? 'inherit'
              : undefined,
            // background: {
            //   xs: hasReachedPosition ? undefined : 'inherit',
            //   md: isDarkMode
            //     ? 'var(--color-dark-main)'
            //     : 'var(--color-light-main)',
            // },

            '&:hover': {
              bgcolor:
                isHomePage && !hasReachedPosition
                  ? isDarkMode
                    ? 'rgba(0,0,0,0.2)'
                    : 'rgba(255,255,255, 0.1)'
                  : undefined,

              backdropFilter: 'blur(4px)',
            },
          }}
        >
          <Container sx={{ display: 'flex', alignItems: 'center' }}>
            <Logo />

            <Box
              sx={{
                display: {
                  xs: 'none',
                  lg: isMySettingsPage ? 'none' : 'flex',
                },
              }}
            >
              {links()}
            </Box>

            <StyledNavIconsContainer>
              {session ? (
                isLoading ? (
                  <SkeletonCircular w={32} h={32} l={4} />
                ) : (
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
                )
              ) : (
                <>
                  <IconButton>
                    <FavoriteBorderOutlinedIcon />
                  </IconButton>

                  <IconButton>
                    <ShoppingCartOutlinedIcon />
                  </IconButton>

                  <IconButton onClick={handleAuthClick}>
                    <AccountCircleOutlinedIcon />
                  </IconButton>
                </>
              )}

              <IconButton
                aria-label="open nav drawer"
                edge="start"
                onClick={() => toggleNavDrawer('bottom', true)}
                sx={{
                  display: isMySettingsPage
                    ? 'none'
                    : { sm: 'flex', lg: 'none' },
                  ml: 1,
                }}
              >
                <MenuIcon />
              </IconButton>
            </StyledNavIconsContainer>
          </Container>
        </AppBar>
      </HideOnScroll>

      <NavDrawer linksTransLations={linksTransLations} />

      {open && !session && (
        <DialogContext.Provider value={{ open, setOpen }}>
          <AuthFormDialog />
        </DialogContext.Provider>
      )}
    </>
  );
}
