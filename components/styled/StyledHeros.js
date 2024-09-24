'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledHeroHeader = styled(Box)(({ theme }) => {
  const { breakpoints } = theme;
  const xtraSmallScreen = breakpoints.up('xs');
  const smallScreen = breakpoints.up('sm');
  const mediumScreen = breakpoints.up('md');

  return {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',

    '.hero-image': {
      width: '100%',

      [xtraSmallScreen]: {
        height: '80vh',
      },

      [smallScreen]: {
        height: '100vh',
      },

      [mediumScreen]: {
        height: '80vh',
      },
    },
  };
});
