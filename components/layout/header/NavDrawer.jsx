import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  IconButton,
  Collapse,
  Container,
  List,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// local imports
import { StyledNavDrawer } from '@/components/styled/StyledDrawers';
import { StyledNavListItem } from '@/components/styled/StyledListItems';
import { useNavDrawerStore } from '@/stores/drawerStore';
import Logo from './Logo';

export default function NavDrawer({ linksTransLations }) {
  const [dropDownMenuOpen, setDropdownMenuOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState('');

  const router = useRouter();

  const { state, toggleNavDrawer } = useNavDrawerStore();

  const handleClick = ({ href, dropDownMenu, label }) => {
    if (dropDownMenu) {
      setSelectedLabel(label);
      setDropdownMenuOpen(!dropDownMenuOpen);
    } else {
      router.push(href);
      setDropdownMenuOpen(false);
      toggleNavDrawer('bottom', false);
    }
  };

  const drawer = () => {
    const dropDown = (item) =>
      item.dropDownMenu
        .sort((a, b) => a.label.localeCompare(b.label))
        .map(({ label, href }) => (
          <List key={label} component="div" disablePadding>
            <ListItemButton onClick={() => handleClick({ href })}>
              <ListItemText primary={label} sx={{ ml: 1 }} />
            </ListItemButton>
          </List>
        ));

    const links = linksTransLations.map((item) => {
      const { label, href, dropDownMenu } = item;

      return (
        <StyledNavListItem key={label} disablePadding>
          <ListItemButton
            onClick={() => handleClick({ href, dropDownMenu, label })}
          >
            <ListItemText
              primary={label}
              sx={{
                color:
                  dropDownMenuOpen &&
                  selectedLabel === label &&
                  'var(--color-text-main)',
              }}
            />

            {dropDownMenuOpen && selectedLabel === label
              ? dropDownMenu && <ExpandLess sx={{ color: '#2d9562' }} />
              : dropDownMenu && <ExpandMore />}
          </ListItemButton>

          {dropDownMenu && selectedLabel === label && (
            <Collapse in={dropDownMenuOpen} timeout="auto" unmountOnExit>
              {dropDown(item)}
            </Collapse>
          )}
        </StyledNavListItem>
      );
    });

    return (
      <Container component="nav" role="presentation">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo />

          <IconButton
            aria-label="close nav drawer"
            edge="start"
            onClick={() => toggleNavDrawer('bottom', false)}
          >
            <CloseIcon sx={{ fontSize: '2rem' }} />
          </IconButton>
        </Box>

        <List sx={{ mt: 2 }}>{links}</List>
      </Container>
    );
  };

  return (
    <StyledNavDrawer
      hideBackdrop={true}
      variant="temporary"
      transitionDuration={0}
      anchor="bottom"
      open={state['bottom']}
    >
      {drawer()}
    </StyledNavDrawer>
  );
}
