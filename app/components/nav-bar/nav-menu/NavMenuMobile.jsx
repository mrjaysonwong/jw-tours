import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  Box,
  Container,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Drawer,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavDrawerStore } from '@/stores/drawerStore';
import { menuLinks } from '@/src/navigation-links/menuLinks';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { StyledListItem } from './styled';
import { authPage, hideNavLinks } from '@/utils/helper/common';
import Logo from '../Logo';

const drawerWidth = '100%';

export default function NavMenuMobile() {
  const t = useTranslations('main_nav_links');
  const linksTransLations = menuLinks(t);

  const router = useRouter();

  const { state, toggleNavDrawer } = useNavDrawerStore();
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  const params = useParams();

  const pathname = usePathname();
  const isAuthPage = authPage(pathname);
  const isHideOnSelectedPage = hideNavLinks(pathname, params);

  if (isHideOnSelectedPage || isAuthPage) {
    return null;
  }

  const handleClick = (path, e) => {
    if (e) {
      setSelectedLabel(e.currentTarget.getAttribute('label'));
      setOpen(!open);
    } else {
      router.push(path);
      setOpen(false);
      toggleNavDrawer('bottom', false);
    }
  };

  const renderLinks = () => {
    return (
      <Container role="presentation">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          <IconButton
            aria-label="close-navmenu"
            onClick={() => toggleNavDrawer('bottom', false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List sx={{ mt: 2 }}>
          {linksTransLations.map((item) => (
            <StyledListItem key={item.label} disablePadding>
              <ListItemButton
                label={item.label}
                onClick={
                  item.nestedLabel
                    ? (e) => handleClick(item.href, e)
                    : () => handleClick(item.href)
                }
                sx={{
                  width: '100%',
                }}
              >
                <ListItemText primary={item.label} />
                {open && selectedLabel === item.label
                  ? item.nestedLabel && <ExpandLess />
                  : item.nestedLabel && <ExpandMore />}
              </ListItemButton>

              {item.nestedLabel && selectedLabel === item.label && (
                <Collapse
                  in={open}
                  timeout="auto"
                  unmountOnExit
                  sx={{ width: '100%' }}
                >
                  {item.nestedLabel
                    .sort((a, b) => a.label.localeCompare(b.label))
                    .map((item) => (
                      <List key={item.label} component="div" disablePadding>
                        <ListItemButton onClick={() => handleClick(item.href)}>
                          <ListItemText primary={item.label} sx={{ ml: 1 }} />
                        </ListItemButton>
                      </List>
                    ))}
                </Collapse>
              )}
            </StyledListItem>
          ))}
        </List>
      </Container>
    );
  };

  return (
    <>
      <IconButton
        aria-label="navmenu"
        onClick={() => toggleNavDrawer('bottom', true)}
        sx={{ ml: 1, display: { lg: 'none' } }}
      >
        <MenuIcon />
      </IconButton>

      <Drawer
        hideBackdrop={true}
        variant="temporary"
        transitionDuration={0}
        anchor="bottom"
        open={state['bottom']}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundImage: 'none',
            height: '100vh',
          },
        }}
      >
        {renderLinks()}
      </Drawer>
    </>
  );
}
