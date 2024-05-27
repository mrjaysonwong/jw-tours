import React, { useState } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  Box,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  Collapse,
  Icon,
} from '@mui/material';
import { navRoutes } from '@/src/routes/nav-routes';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { LinkContainer, NestedLinkContainer } from '../styled';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';
import { authPage, hideNavLinks } from '@/utils/helper/common';

export default function NavbarLinks() {
  const [open, setOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  const params = useParams();
  const pathname = usePathname();


  const isAuthPage = authPage(pathname);
  const isHideOnSelectedPage = hideNavLinks(pathname, params);

  if (isHideOnSelectedPage || isAuthPage) {
    return null;
  }

  const handleClick = (e) => {
    setSelectedLabel(e.currentTarget.getAttribute('label'));
    setOpen(!open);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleMouseOver = (e) => {
    setSelectedLabel(e.currentTarget.getAttribute('label'));

    setOpen(true);
  };

  const NavList = navRoutes.map((item) => (
    <Box
      key={item.label}
      sx={{ a: { color: 'inherit', textAlign: 'center' } }}
    >
      <Link href={`${item.nestedLabel ? '#' : item.pathname}`} passHref>
        <LinkContainer
          open={open}
          nested={item.nestedLabel}
          selected={selectedLabel}
          label={item.label}
          itempathname={item.pathname}
          pathname={pathname}
          onClick={(e) => handleClick(e)}
          onMouseOver={(e) => handleMouseOver(e)}
        >
          <Typography variant="body2" sx={{ width: '95px' }}>
            {item.label}
          </Typography>

          {open && selectedLabel === item.label
            ? item.nestedLabel && <ExpandLess fontSize="small" />
            : item.nestedLabel && <ExpandMore fontSize="small" />}
        </LinkContainer>
      </Link>

      {item.nestedLabel && selectedLabel === item.label && (
        <ClickAwayListener
          mouseEvent="onMouseDown"
          touchEvent="onTouchStart"
          onClickAway={handleClickAway}
        >
          <NestedLinkContainer onMouseLeave={() => setOpen(false)}>
            <Collapse in={open} timeout={0} unmountOnExit>
              {item.nestedLabel.map((item) => (
                <List key={item.label} component="div" disablePadding>
                  <Link href={`${item.pathname}`}>
                    <ListItemButton sx={{ my: 1 }} onClick={handleClick}>
                      <Icon fontSize="small">{item.icon}</Icon>

                      <ListItemText
                        primary={item.label}
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
          alignItems: 'center',
          overflow: 'auto',
          mx: 3,
        }}
      >
        {NavList}
      </Box>
    </>
  );
}
