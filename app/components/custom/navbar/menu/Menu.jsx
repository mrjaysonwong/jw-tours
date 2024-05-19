import React, { useState } from 'react';
import { usePathname, useRouter, useParams } from 'next/navigation';
import {
  Box,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Drawer,
  Icon,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavDrawerStore } from '@/stores/drawerStore';
import { navRoutes } from '@/src/routes/nav-routes';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { StyledListItem } from '../styles';
import { authPage, hideNavLinks } from '@/utils/helper/common';
const drawerWidth = '100%';

export default function Menu() {
  const router = useRouter();

  const { state, toggleNavDrawer } = useNavDrawerStore();
  const [open, setOpen] = useState(false);
  const [selectedPathName, setSelectedPathName] = useState('');

  const params = useParams();

  const pathname = usePathname();
  const isAuthPage = authPage(pathname);
  const isHideOnSelectedPage = hideNavLinks(pathname, params);

  if (isHideOnSelectedPage || isAuthPage) {
    return null;
  }
  
  const handleClick = (path, e) => {
    if (e) {
      setSelectedPathName(e.currentTarget.getAttribute('pathname'));
      setOpen(!open);
    } else {
      router.push(path);
      setOpen(false);
      toggleNavDrawer('bottom', false);
    }
  };

  const DrawerList = (
    <Box sx={{ mt: 6, px: 4 }} role="presentation">
      <IconButton
        onClick={() => toggleNavDrawer('right', false)}
        sx={{ position: 'absolute', top: 12, right: 15, color: 'inherit' }}
      >
        <CloseIcon />
      </IconButton>
      <List>
        {navRoutes.map((item) => (
          <StyledListItem key={item.pathName} disablePadding>
            <ListItemButton
              pathname={item.pathName}
              onClick={
                item.nestedPathName
                  ? (e) => handleClick(item.path, e)
                  : () => handleClick(item.path)
              }
              sx={{ width: '100%' }}
            >
              <ListItemText primary={item.pathName} />
              {open && selectedPathName === item.pathName
                ? item.nestedPathName && <ExpandLess />
                : item.nestedPathName && <ExpandMore />}
            </ListItemButton>

            {item.nestedPathName && selectedPathName === item.pathName && (
              <Collapse
                in={open}
                timeout="auto"
                unmountOnExit
                sx={{ width: '100%' }}
              >
                {item.nestedPathName.map((item) => (
                  <List key={item.pathName} component="div" disablePadding>
                    <ListItemButton
                      sx={{ pl: 4 }}
                      onClick={() => handleClick(item.path)}
                    >
                      <Icon fontSize="small">{item.icon}</Icon>
                      <ListItemText primary={item.pathName} sx={{ ml: 1 }} />
                    </ListItemButton>
                  </List>
                ))}
              </Collapse>
            )}
          </StyledListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          display: { md: 'flex', lg: 'none' },
        }}
      >
        <IconButton
          aria-label="nav-menu"
          onClick={() => toggleNavDrawer('bottom', state.bottom ? false : true)}
          sx={{ ml: 2 }}
        >
          {state.bottom ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Drawer
        elevation={0}
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
        {DrawerList}
      </Drawer>
    </>
  );
}
