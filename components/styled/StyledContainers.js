'use client';

import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';

export const StyledMainContainer = styled(Container)({
  minHeight: '100dvh',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',

  a: {
    color: 'var(--color-blue-light)',
  },

  'h6, h5, h4, h3': {
    fontWeight: 550,
  },
});

export const StyledContainer = styled(Container)({
  marginTop: '4.2rem',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '2rem 1rem 2rem 1rem',

  a: {
    textDecoration: 'none',
    color: 'var(--color-blue-light)',
  },

  'h5, h4, h3': {
    fontWeight: 550,
  },
});

export const StyledSignInWithContainer = styled(Box)({
  display: 'flex',
  flexWrap: 'wrap',

  'button:not(:last-child)': {
    marginRight: '1rem',
  },

  '.oauth': {
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: 'silver',
    },
  },

  '.btn-google': {
    backgroundColor: 'var(--color-light-main)',
  },

  '.btn-github': {
    backgroundColor: 'var(--color-dark-main)',
  },

  '.btn-facebook': {
    backgroundColor: 'var(--color-blue-darker)',
  },
  '.btn-email': {
    backgroundColor: 'var(--color-light-main)',
  },
});

export const StyledNavIconsContainer = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  marginLeft: 'auto',

  svg: {
    fontSize: '2rem',
  },

  button: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
});

export const StyledNavLinksContainer = styled(Box)(({ theme }) => {
  const { palette } = theme;
  const isDarkMode = palette.mode === 'dark';

  return {
    button: {
      minWidth: '130px',
      textTransform: 'uppercase',
      color: isDarkMode ? 'white' : 'black',

      '&:hover': {
        color: 'var(--color-green-light)',
      },
    },

    a: {
      float: 'left',
    },

    '.dropdown': {
      float: 'left',
    },

    '.dropdown-content': {
      // display: 'none',
      opacity: 0,
      visibility: 'hidden',
      position: 'absolute',
      maxWidth: '450px',
      // transition: 'max-height 1s ease, opacity 0.1s ease, visibility 0.3s ease',
      maxHeight: 0,
      overflow: 'hidden',
      zIndex: 1, // Ensure dropdown is above other content
    },

    '.dropdown-content a': {
      color: 'inherit',
      padding: '12px 16px',
      textAlign: 'left',
      textTransform: 'uppercase',
      fontSize: '0.9rem',
      fontWeight: '500',
    },

    '.dropdown-content a:hover': {
      color: 'var(--color-text-main)',
    },

    '.dropdown:hover .dropdown-content': {
      maxHeight: '500px', // Adjust as needed based on your content height
      opacity: 1,
      visibility: 'visible',
    },
  };
});

export const StyledHeadlineContainer = styled(Container)({
  position: 'absolute',
  zIndex: 2,

  h2: {
    fontSize: 'clamp(2rem, 5vw, 4rem)',
    letterSpacing: '-1px',
    fontWeight: 550,
  },

  p: {
    fontSize: 'clamp(0.8rem, 5vw, 1.2rem)',
  },

  'h2, p, button': {
    color: '#f5f5f5',
    textTransform: 'none',
  },
});

export const StyledItemContainer = styled(Box)(({ theme }) => {
  const { breakpoints, palette } = theme;
  const xtraSmallScreen = breakpoints.up('xs');
  const largeScreen = breakpoints.up('lg');
  const isDarkMode = palette.mode === 'dark';

  return {
    width: '100%',
    padding: '16px 0',
    display: 'flex',

    '&:not(:last-child)': {
      borderBottom: `1px solid ${
        isDarkMode ? 'rgba(255, 255, 255, 0.12)' : 'rgba(4, 4, 4, 0.12)'
      } `,
    },

    [xtraSmallScreen]: {
      flexDirection: 'column',
    },

    [largeScreen]: {
      flexDirection: 'row',
    },
  };
});
