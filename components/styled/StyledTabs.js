'use client';

import { Tab, Tabs } from '@mui/material';
import { styled } from '@mui/system';

export const StyledSettingsTab = styled(Tab)(({ theme }) => {
  const { palette } = theme;
  const isDarkMode = palette.mode === 'dark';

  return {
    color: 'inherit',
    textTransform: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    borderRight: '1px solid',
    borderBottom: '1px solid',
    borderLeft: '1px solid',
    borderColor: isDarkMode
      ? 'rgba(255, 255, 255, 0.12)'
      : 'rgba(4, 4, 4, 0.12)',

    '&:first-child': {
      borderTop: '1px solid',
      borderColor: isDarkMode
        ? 'rgba(255, 255, 255, 0.12)'
        : 'rgba(4, 4, 4, 0.12)',
    },
  };
});

export const StyledHeroTabs = styled(Tabs)(({ theme }) => {
  const { breakpoints } = theme;
  const xtraSmallScreen = breakpoints.up('xs');
  const largeScreen = breakpoints.up('lg');

  return {
    display: 'flex',
    alignItems: 'center',
    zIndex: 2,

    [largeScreen]: {
      width: '80vw',
    },

    button: {
      textTransform: 'none',
      fontWeight: 550,
      color: 'white',
      borderRadius: '16px 16px 0 0',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

      [xtraSmallScreen]: {
        width: '160px',
        fontSize: '1rem',
        flexDirection: 'column',
      },

      [largeScreen]: {
        width: '280px',
        fontSize: '1.5rem',
        flexDirection: 'row',
      },

      svg: {
        fontSize: '2rem',
      },
    },

    '.MuiTabs-scrollButtons': {
      opacity: 0.9,
      color: 'white',

      svg: {
        fontSize: '2rem',
      },
    },
  };
});
