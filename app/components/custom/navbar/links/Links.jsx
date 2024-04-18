import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Icon,
} from '@mui/material';
import { navRoutes } from '@/src/nav-routes';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LinkContainer, NestedLinkContainer } from '../styles';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { checkPath } from '@/utils/common';

export default function NavbarLinks() {
  const [open, setOpen] = useState(false);
  const [selectedPathName, setSelectedPathName] = useState('');

  const pathname = usePathname();
  const isAuthPage = checkPath(pathname);

  if (isAuthPage) {
    return null;
  }

  const handleClick = (e) => {
    setSelectedPathName(e.currentTarget.getAttribute('id'));
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleMouseOver = (e) => {
    setSelectedPathName(e.currentTarget.getAttribute('id'));
    setOpen(true);
  };

  const list = navRoutes.map((item) => (
    <Box
      key={item.pathName}
      sx={{ a: { color: 'inherit', textAlign: 'center' } }}
    >
      <Link href={`${item.nestedPathName ? '#' : item.path}`} passHref>
        <LinkContainer
          id={item.pathName}
          open={open}
          nested={item.nestedPathName}
          selected={selectedPathName}
          pathname={item.pathName}
          onClick={(e) => handleClick(e)}
          onMouseOver={(e) => handleMouseOver(e)}
        >
          <Typography variant="body2" sx={{ width: '90px' }}>
            {item.pathName}
          </Typography>

          {open && selectedPathName === item.pathName
            ? item.nestedPathName && <ExpandLess fontSize="small" />
            : item.nestedPathName && <ExpandMore fontSize="small" />}
        </LinkContainer>
      </Link>

      {item.nestedPathName && selectedPathName === item.pathName && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={handleClickAway}
        >
          <NestedLinkContainer onMouseLeave={() => setOpen(false)}>
            <Collapse in={open} timeout={0} unmountOnExit>
              {item.nestedPathName.map((item) => (
                <List key={item.pathName} component="div" disablePadding>
                  <Link href={`${item.path}`}>
                    <ListItemButton sx={{ my: 1 }} onClick={handleClick}>
                      <Icon fontSize="small">{item.icon}</Icon>

                      <ListItemText
                        primary={item.pathName}
                        sx={{ ml: 1 }}
                        primaryTypographyProps={{ fontSize: '14px' }}
                      />
                    </ListItemButton>
                  </Link>
                </List>
              ))}
            </Collapse>
          </NestedLinkContainer>
        </ClickAwayListener>
      )}
    </Box>
  ));

  return (
    <>
      <Box
        sx={{
          display: {
            xs: 'none',
            md: 'none',
            lg: 'flex',
          },
          width: '70vw',
          alignItems: 'center',
          overflow: 'auto',
          mx: 4,
        }}
      >
        {list}
      </Box>
    </>
  );
}
