import React, { useState } from 'react';
import { usePathname, useParams } from 'next/navigation';
import Link from 'next/link';
import { Box, Button, Grid, Paper } from '@mui/material';
import { menuLinks } from '@/src/navigation-links/menuLinks';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { authPage, hideNavLinks } from '@/utils/helper/common';
import { StyledNavMenuLinks } from './styled';

export default function NavMenu() {
  const [hoveredDropdown, setHoveredDropdown] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(null);

  const params = useParams();
  const pathname = usePathname();

  const isAuthPage = authPage(pathname);
  const isHideOnSelectedPage = hideNavLinks(pathname, params);

  if (isHideOnSelectedPage || isAuthPage) {
    return null;
  }

  const handleMouseEnter = (dropdown) => {
    setHoveredDropdown(dropdown);
    setOpenDropdown(true);
  };

  const handleMouseLeave = () => {
    setHoveredDropdown(null);
  };

  const handleClick = () => {
    setOpenDropdown(null);
    setHoveredDropdown(null);
  };

  const renderEndIcon = (dropdown) =>
    openDropdown && hoveredDropdown === dropdown ? (
      <ExpandLess />
    ) : (
      <ExpandMore />
    );

  const renderLinks = () => {
    return (
      <StyledNavMenuLinks>
        {menuLinks.map((item) => {
          if (item.dropdown) {
            return (
              <Box
                key={item.label}
                className={`dropdown ${item.dropdown}`}
                onMouseEnter={() => handleMouseEnter(item.dropdown)}
                onMouseLeave={handleMouseLeave}
              >
                <Button
                  className="dropbtn"
                  disableRipple
                  endIcon={renderEndIcon(item.dropdown)}
                  sx={{
                    color:
                      hoveredDropdown === item.dropdown
                        ? 'var(--palette-orange) !important'
                        : undefined,
                  }}
                >
                  {item.label}
                </Button>

                {openDropdown && (
                  <Paper className={'dropdown-content'}>
                    <Grid container>
                      {item.nestedLabel
                        .sort((a, b) => a.label.localeCompare(b.label))
                        .map((nestedItem) => (
                          <Grid key={nestedItem.label} item md={6}>
                            <Link href={nestedItem.href} onClick={handleClick}>
                              {nestedItem.label}
                            </Link>
                          </Grid>
                        ))}
                    </Grid>
                  </Paper>
                )}
              </Box>
            );
          } else {
            return (
              <Link key={item.label} href={item.href}>
                <Button>{item.label}</Button>
              </Link>
            );
          }
        })}
      </StyledNavMenuLinks>
    );
  };

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
          mx: 3,
        }}
      >
        {renderLinks()}
      </Box>
    </>
  );
}
