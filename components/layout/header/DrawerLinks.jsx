import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { IconButton, Collapse, Toolbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// internal imports
import { StyledSidebarNav } from '@/components/styled/StyledSidebars';
import Logo from './Logo';
import { stripLocale } from '@/helpers/pageHelpers';

const DrawerLinks = ({ toggleDrawer, linksTransLations }) => {
  const [showDropdown, setShowDropdown] = useState({});
  const router = useRouter();
  const pathname = usePathname();
  const strippedPathname = stripLocale(pathname);

  const handleToggle = (dropdown) => {
    setShowDropdown((prev) => {
      return {
        [dropdown]: prev[dropdown] ? false : true, // Close if already open, otherwise open it
      };
    });
  };

  const handleClick = (href) => {
    setShowDropdown(false);
    toggleDrawer('navDrawerOpen', false);
    router.replace(href);
  };

  const handleOnKeyDown = (dropDownMenu, label, href, event) => {
    if (event.key === 'Enter') {
      if (dropDownMenu) {
        handleToggle(label);
      } else {
        event.preventDefault();
        handleClick(href);
      }
    }
  };

  return (
    <>
      <StyledSidebarNav component="nav" role="presentation">
        <Toolbar sx={{ mb: 3 }}>
          <Logo />
          <IconButton
            aria-label="close nav drawer"
            onClick={() => toggleDrawer('navDrawerOpen', false)}
            sx={{
              ml: 'auto',
              svg: {
                fontSize: '2rem',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>

        <ul>
          {linksTransLations.map((link, index) => {
            const { href, dropDownMenu, label } = link;
            const isDropdownOpen = showDropdown[label];

            const isSubLinkActive = dropDownMenu.some(
              (subLink) =>
                subLink.href === strippedPathname && strippedPathname !== '/'
            );

            return (
              <li key={index}>
                <div
                  tabIndex={0}
                  className={`toggle-list ${isSubLinkActive ? 'active' : ''}`}
                  onClick={() =>
                    dropDownMenu ? handleToggle(label) : handleClick(href)
                  }
                  onKeyDown={(e) =>
                    handleOnKeyDown(dropDownMenu, label, href, e)
                  }
                >
                  {label}
                  {dropDownMenu && (
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {isDropdownOpen ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  )}
                </div>

                {dropDownMenu && (
                  <Collapse in={isDropdownOpen} timeout="auto">
                    <ul className="dropdown">
                      {dropDownMenu.map((subLink, index) => (
                        <li
                          key={`${index}-${subLink.label}`}
                          tabIndex={0}
                          onClick={() => handleClick(subLink.href)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleClick(subLink.href);
                            }
                          }}
                        >
                          {subLink.label}
                        </li>
                      ))}
                    </ul>
                  </Collapse>
                )}
              </li>
            );
          })}
        </ul>
      </StyledSidebarNav>
    </>
  );
};

export default DrawerLinks;
