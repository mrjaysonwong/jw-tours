import React, { useState } from 'react';
import Link from 'next/link';
import { Box, Paper, Button, Grid } from '@mui/material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

// internal imports
import { StyledNavLinksContainer } from '@/components/styled/StyledContainers';

export default function TopNavLinks({ linksTransLations }) {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [dropDownMenuOpen, setDropdownMenuOpen] = useState(null);

  const handleMouseEnter = (label) => {
    setSelectedLabel(label);
    setDropdownMenuOpen(true);
  };

  const handleMouseLeave = () => {
    setSelectedLabel(null);
    setDropdownMenuOpen(null);
  };

  const handleClick = () => {
    setDropdownMenuOpen(null);
    setSelectedLabel(null);
  };

  const renderEndIcon = (label) =>
    dropDownMenuOpen && selectedLabel === label ? (
      <ExpandLess />
    ) : (
      <ExpandMore />
    );

  return (
    <StyledNavLinksContainer>
      {linksTransLations.map((item) => {
        const { label, href, dropDownMenu } = item;

        if (dropDownMenu) {
          return (
            <Box
              key={label}
              className="dropdown"
              onMouseEnter={() => handleMouseEnter(label)}
              onMouseLeave={handleMouseLeave}
            >
              <Button
                className="dropbtn"
                disableRipple
                endIcon={renderEndIcon(label)}
                sx={{ '&.MuiButton-root:hover': { bgcolor: 'transparent' } }}
              >
                {label}
              </Button>

              {dropDownMenuOpen && (
                <Paper
                  className={'dropdown-content'}
                  elevation={3}
                  sx={{ borderRadius: '0px 0px 6px 6px' }}
                >
                  <Grid container>
                    {item.dropDownMenu
                      .sort((a, b) => a.label.localeCompare(b.label))
                      .map(({ label, href }) => (
                        <Grid key={label} item md={6}>
                          <Link href={href} onClick={handleClick}>
                            {label}
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
            <Link key={label} href={href}>
              <Button
                disableRipple
                sx={{ '&.MuiButton-root:hover': { bgcolor: 'transparent' } }}
              >
                {label}
              </Button>
            </Link>
          );
        }
      })}
    </StyledNavLinksContainer>
  );
}
