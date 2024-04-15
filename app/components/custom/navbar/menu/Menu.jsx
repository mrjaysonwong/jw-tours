import React, { useState, useContext } from 'react';
import { usePathname, useRouter } from 'next/navigation';
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
import { navRoutes } from '@/src/nav-routes';
import CloseIcon from '@mui/icons-material/Close';
import { AuthButtonsMobile } from '../auth-buttons/AuthButtons';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { StyledListItem } from '../styles';
import { checkPath } from '@/utils/common';
import { UserSectionMobile } from '../user-section/UserSection';
import { useSession } from 'next-auth/react';
import { UserSessionContext } from '@/context/UserSessionWrapper';

const drawerWidth = '100%';

export default function Menu() {
  const session = useContext(UserSessionContext);
  const { status } = useSession();

  const router = useRouter();

  const { state, toggleNavDrawer } = useNavDrawerStore();
  const [open, setOpen] = useState(false);
  const [selectedPathName, setSelectedPathName] = useState('');

  const pathname = usePathname();
  const isAuthPage = checkPath(pathname);

  if (isAuthPage) {
    return null;
  }

  const handleClick = (path, e) => {
    if (e) {
      setSelectedPathName(e.currentTarget.getAttribute('id'));
      setOpen(!open);
    } else {
      router.push(path);
      setOpen(false);
      toggleNavDrawer('right', false);
    }
  };

  const drawer = (
    <>
      <Box sx={{ px: 3 }}>
        {status === 'authenticated' || session ? (
          <UserSectionMobile />
        ) : (
          <AuthButtonsMobile />
        )}

        <List>
          {navRoutes.map((item) => (
            <StyledListItem key={item.pathName} disablePadding>
              <ListItemButton
                id={item.pathName}
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
    </>
  );

  return (
    <>
      <Box
        sx={{
          ml: 'auto',
          display: { md: 'flex', lg: 'none' },
        }}
      >
        <IconButton
          edge="start"
          aria-label="menu"
          onClick={() => toggleNavDrawer('right', state.right ? false : true)}
        >
          {state.right ? <CloseIcon /> : <MenuIcon />}
        </IconButton>
      </Box>

      <Drawer
        hideBackdrop={true}
        variant="temporary"
        transitionDuration={0}
        anchor="right"
        open={state['right']}
        sx={{
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            backgroundImage: 'none',
            height: '90vh',
            mt: 7,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
