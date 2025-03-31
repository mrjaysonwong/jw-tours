import React, { useRef, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Paper, Grid, useMediaQuery } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// internal imports
import { StyledNavLinksContainer } from '@/components/styled/StyledContainers';
import { stripLocale } from '@/helpers/pageHelpers';
import ClickAwayListener from '@/utils/components/ClickAwayListener';

const TopNavLinks = ({ linksTransLations }) => {
  const [showDropdown, setShowDropdown] = useState({});

  const router = useRouter();
  const pathname = usePathname();
  const strippedPathname = stripLocale(pathname);

  const dropdownRef = useRef(null);
  const notLargeScreen = useMediaQuery('(max-width:1200px)');

  const handleToggle = (dropdown) => {
    setShowDropdown((prev) => {
      return {
        [dropdown]: !prev[dropdown], // Close if already open, otherwise open it
      };
    });
  };

  const handleClick = (href) => {
    setShowDropdown({});
    router.push(href);
  };

  const handleOnKeyDown = ({ dropDownMenu, label, href, e }) => {
    if (e.key === 'Enter') {
      if (dropDownMenu) {
        handleToggle(label);
      } else {
        e.preventDefault();
        handleClick(href);
      }
    }
  };

  const handleClickAway = (event) => {
    setShowDropdown({});
  };

  return (
    <StyledNavLinksContainer>
      <ClickAwayListener onClickAway={handleClickAway}>
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
                  onKeyDown={(e) => handleOnKeyDown({ ...link, e })}
                  onMouseEnter={() => !notLargeScreen && handleToggle(label)}
                  onMouseLeave={() => !notLargeScreen && setShowDropdown({})}
                >
                  {label}
                  {dropDownMenu && (
                    <span style={{ display: 'flex', alignItems: 'center' }}>
                      {isDropdownOpen ? <ExpandLess /> : <ExpandMore />}
                    </span>
                  )}
                </div>

                {dropDownMenu && (
                  <Paper
                    className={`dropdown ${isDropdownOpen ? 'open' : ''}`}
                    elevation={3}
                    onMouseEnter={() => !notLargeScreen && handleToggle(label)}
                    onMouseLeave={() => !notLargeScreen && setShowDropdown({})}
                    ref={dropdownRef}
                  >
                    <Grid container spacing={2}>
                      {dropDownMenu
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((subLink, index) => {
                          return (
                            <Grid key={`${index}-${subLink.label}`} item md={6}>
                              <ul>
                                <li
                                  data-list="dropdown"
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
                              </ul>
                            </Grid>
                          );
                        })}
                    </Grid>
                  </Paper>
                )}
              </li>
            );
          })}
        </ul>
      </ClickAwayListener>
    </StyledNavLinksContainer>
  );
};

export default TopNavLinks;
