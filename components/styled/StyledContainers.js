'use client';

import { Box, Container } from '@mui/material';
import { styled } from '@mui/system';
import { scrollbarStyles } from '@/components/styled/StyledScrollBars';

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

export const StyledLayoutContainer = styled(Box)({
  minHeight: '100dvh'
})

export const StyledContainer = styled(Container)({
  marginTop: '4.2rem',
  minHeight: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: '2rem 1rem 2rem 1rem',

  a: {
    color: 'var(--color-blue-light)',
  },

  'h6, h5, h4, h3': {
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
  return {
    ul: {
      display: 'flex',
      alignItems: 'center',
      listStyle: 'none',
    },

    li: {
      padding: '5px',
    },

    '& .toggle-list': {
      userSelect: 'none',
      cursor: 'pointer',
      padding: '10px 20px',
      display: 'flex',
      alignItems: 'center',

      '&:hover': {
        color: 'var(--color-green-light)',
      },
    },

    '& .dropdown': {
      userSelect: 'none',
      position: 'absolute',
      maxWidth: '340px',
      borderRadius: '0px 0px 6px 6px',
      padding: 15,

      opacity: 0,
      visibility: 'hidden',
      transition: 'height 0.3s ease, opacity 0.3s ease, visibility 0.3s ease',
      // transform: 'scaleY(0)',
      // transformOrigin: 'top',
    },

    '& .dropdown.open': {
      opacity: 1,
      visibility: 'visible',
      height: 'auto',
      // transform: 'scaleY(1)',
    },

    '& .dropdown li': {
      cursor: 'pointer',

      '&:hover': {
        color: 'var(--color-green-light)',
      },
    },

    '& .active': {
      color: 'var(--color-green-light)',
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

  return {
    width: '100%',
    padding: '16px 0',
    display: 'flex',

    '&:not(:last-child)': {
      borderBottom: `1px solid ${palette.divider}`,
    },

    '& > div:first-of-type > p': {
      fontWeight: 450,
      color: 'dimgray',
    },

    [xtraSmallScreen]: {
      flexDirection: 'column',
    },

    [largeScreen]: {
      flexDirection: 'row',
    },
  };
});

export const StyledDrawerSectionContainer = styled(Box)(({ theme }) => ({
  padding: '0px 15px',
  ...scrollbarStyles,

  ul: {
    listStyle: 'none',
  },

  '& .container': {
    marginBottom: '10px',
  },

  '& .section-title': {
    fontWeight: 450,
    fontSize: '12px',
    padding: 10,
    textTransform: 'uppercase',
    color: 'gray',
  },

  '& .list-btn': {
    borderRadius: '6px',
  },

  '& .dropdown': {
    paddingTop: '4px',
    paddingBottom: '4px',
    paddingLeft: 7,
    borderLeft: `1px solid ${theme.palette.divider}`,
  },

  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 12,
  },
}));
