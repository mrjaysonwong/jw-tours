import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Box,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import CircleIcon from '@mui/icons-material/Circle';

// internal imports
import {
  drawerDashboardLinks,
  drawerManagementLinks,
} from '@/data/links/adminDashboardLinks';
import { stripLocale } from '@/helpers/pageHelpers';

const Logo = () => (
  <Link href="/admin/dashboard">
    <Box sx={{ position: 'relative', width: '150px', height: '64px' }}>
      <Image
        src={'/assets/horizontal_logo.svg'}
        alt="logo"
        fill
        style={{ objectFit: 'fill' }}
        priority
      />
    </Box>
  </Link>
);

const MenuItem = ({ item, handleClick, pathname }) => {
  const { label, href, icon } = item;
  const isActive = href === pathname;

  return (
    <ListItem disablePadding>
      <ListItemButton
        disableRipple
        onClick={() => handleClick({ href })}
        sx={{
          mx: 3,
          py: 0.5,
          borderRadius: '8px',
          bgcolor: isActive ? 'var( --color-green-alpha)' : 'inherit',

          '&:hover': {
            bgcolor: isActive && 'var( --color-green-alpha)',
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
      </ListItemButton>
    </ListItem>
  );
};

const DropDownMenuItem = ({ item, isOpen, handleClick, pathname }) => {
  const { label, icon, dropDownMenu } = item;

  const isMatch = dropDownMenu.some((e) => e.href === pathname);

  return (
    <ListItem
      disablePadding
      sx={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <ListItemButton
        disableRipple
        onClick={() => handleClick({ dropDownMenu, label })}
        sx={{
          width: '82.810%',
          py: 0.5,
          pointerEvents: isMatch && 'none',
          borderRadius: '8px',

          'svg, span': {
            color: isMatch && 'var(--color-text-main)',
          },
        }}
      >
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={label} />
        {isOpen || isMatch ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse
        in={isOpen || isMatch}
        timeout="auto"
        unmountOnExit
        sx={{ width: '82.810%' }}
      >
        {dropDownMenu
          .sort((a, b) => a.label.localeCompare(b.label))
          .map(({ label, href }) => {
            const isActive = href === pathname;

            return (
              <List key={label} component="div" disablePadding>
                <ListItemButton
                  disableRipple
                  onClick={() => handleClick({ label, href })}
                  sx={{
                    py: 0.5,
                    borderRadius: '8px',
                    bgcolor: isActive ? 'var( --color-green-alpha)' : 'inherit',

                    '&:hover': {
                      bgcolor: isActive && 'var( --color-green-alpha)',
                    },
                  }}
                >
                  <ListItemIcon sx={{ svg: { margin: 'auto' } }}>
                    <CircleIcon sx={{ fontSize: '6px' }} />
                  </ListItemIcon>
                  <ListItemText primary={label} />
                </ListItemButton>
              </List>
            );
          })}
      </Collapse>
    </ListItem>
  );
};

export default function NavLinks() {
  const [openMenu, setOpenMenu] = useState(null);
  const router = useRouter();
  const pathname = usePathname();
  const strippedPathname = stripLocale(pathname);

  const params = useParams();
  const { id } = params;

  const handleClick = ({ label, href, dropDownMenu }) => {
    if (dropDownMenu) {
      setOpenMenu(openMenu === label ? null : label);
    } else {
      router.replace(href);
    }
  };

  return (
    <Box sx={{ '.section-title': { mt: 2, mx: 2, fontWeight: 450 } }}>
      <Toolbar>
        <Logo />
      </Toolbar>

      <Box
        sx={{
          overflowY: 'auto',
          height: '88vh',
          pb: 5,

          '&::-webkit-scrollbar': {
            width: '4px',
          },
          '&::-webkit-scrollbar-thumb:vertical': {
            bgcolor: 'rgba(128, 128,128,0.6)',
          },
        }}
      >
        <Typography className="section-title">Dashboard</Typography>
        <List>
          {drawerDashboardLinks.map((item, index) => (
            <MenuItem
              key={index}
              item={item}
              handleClick={handleClick}
              pathname={strippedPathname}
            />
          ))}
        </List>

        <Typography className="section-title">Management</Typography>
        <List>
          {drawerManagementLinks(id).map((item, index) => (
            <DropDownMenuItem
              key={index}
              item={item}
              isOpen={openMenu === item.label}
              handleClick={handleClick}
              pathname={strippedPathname}
            />
          ))}
        </List>
      </Box>
    </Box>
  );
}
