import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  IconButton,
  Collapse,
  Container,
  Toolbar,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// internal imports
import { StyledNavListItem } from '@/components/styled/StyledListItems';
import { StyledNavIconsContainer } from '@/components/styled/StyledContainers';
import { useNavDrawerStore } from '@/stores/drawerStore';
import { NavLogo } from './Navbar';

const drawerWidth = '100%';

const DropdownList = ({
  dropDownMenu,
  handleClick,
  label,
  selectedLabel,
  dropDownMenuOpen,
}) => {
  return (
    <>
      {selectedLabel === label && (
        <Collapse in={dropDownMenuOpen} timeout="auto" unmountOnExit>
          {dropDownMenu
            .sort((a, b) => a.label.localeCompare(b.label))
            .map(({ label, href }) => (
              <List key={label} component="div" disablePadding>
                <ListItemButton onClick={() => handleClick({ href })}>
                  <ListItemText primary={label} sx={{ ml: 1 }} />
                </ListItemButton>
              </List>
            ))}
        </Collapse>
      )}
    </>
  );
};

const NavListItem = ({
  item,
  handleClick,
  selectedLabel,
  dropDownMenuOpen,
}) => {
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
        {dropDownMenu &&
          (dropDownMenuOpen && selectedLabel === label ? (
            <ExpandLess sx={{ color: '#2d9562' }} />
          ) : (
            <ExpandMore />
          ))}
      </ListItemButton>

      <DropdownList
        dropDownMenu={dropDownMenu}
        handleClick={handleClick}
        label={label}
        selectedLabel={selectedLabel}
        dropDownMenuOpen={dropDownMenuOpen}
      />
    </StyledNavListItem>
  );
};

const DrawerList = ({
  toggleNavDrawer,
  linksTransLations,
  handleClick,
  selectedLabel,
  dropDownMenuOpen,
}) => {
  return (
    <Container component="nav" role="presentation">
      <Toolbar
        sx={{
          px: { xs: 0, md: 'auto' },
        }}
      >
        <NavLogo />

        <StyledNavIconsContainer>
          <IconButton
            aria-label="close nav drawer"
            onClick={() => toggleNavDrawer('bottom', false)}
          >
            <CloseIcon />
          </IconButton>
        </StyledNavIconsContainer>
      </Toolbar>

      <List sx={{ mt: 2 }}>
        {linksTransLations.map((item) => (
          <NavListItem
            key={item.label}
            item={item}
            handleClick={handleClick}
            selectedLabel={selectedLabel}
            dropDownMenuOpen={dropDownMenuOpen}
          />
        ))}
      </List>
    </Container>
  );
};

export default function NavDrawer({ linksTransLations }) {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [dropDownMenuOpen, setDropdownMenuOpen] = useState(false);
  const router = useRouter();
  const { state, toggleNavDrawer } = useNavDrawerStore();

  const handleClick = ({ href, dropDownMenu, label }) => {
    if (dropDownMenu) {
      setSelectedLabel(label);
      setDropdownMenuOpen(!dropDownMenuOpen);
    } else {
      router.push(href);
      setDropdownMenuOpen(false);
      toggleNavDrawer('right', false);
    }
  };

  return (
    <Drawer
      // closeAfterTransition={true}
      hideBackdrop={true}
      variant="temporary"
      transitionDuration={400}
      anchor="right"
      open={state['right']}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          backgroundImage: 'none',
          height: '100vh',
        },
      }}
    >
      <DrawerList
        toggleNavDrawer={toggleNavDrawer}
        linksTransLations={linksTransLations}
        handleClick={handleClick}
        selectedLabel={selectedLabel}
        dropDownMenuOpen={dropDownMenuOpen}
      />
    </Drawer>
  );
}
