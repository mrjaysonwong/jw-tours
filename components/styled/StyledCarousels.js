'use client';

import { Box } from '@mui/material';
import { styled, keyframes } from '@mui/system';

const fadeIn = keyframes`
  0% {
    opacity: 0.7;
  }
  100% {
    opacity: 1;

  }
`;

export const StyledHeroCarousel = styled(Box)(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  minHeight: '100vh',

  '.slide': {
    width: '100%',
    height: '100vh',
    animation: `${fadeIn} 1s ease-in-out`,
  },

  '.slide-hidden': {
    display: 'none',
  },

  '.arrow': {
    position: 'absolute',
    color: 'rgba(255,255,255, 0.4)',
    fontSize: '3rem',
    borderRadius: '100%',
    display: 'none',
    zIndex: 2,

    '&:hover': {
      cursor: 'pointer',
      color: 'white',
    },
  },

  '.arrow-left': {
    left: '1rem',
  },

  '.arrow-right': {
    right: '1rem',
  },

  '.indicators': {
    display: 'flex',
    position: 'absolute',
    bottom: '1rem',
    zIndex: 2,
  },

  '.indicator': {
    margin: '0 0.2rem',
    height: '0.5rem',
    width: '0.5rem',
    borderRadius: '100%',
    border: 'none',
    outline: 'none',
    cursor: 'pointer',
  },

  '.indicator-inactive': {
    backgroundColor: 'grey',
  },

  '.overlay': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#121212',
    opacity: 0.3, // Adjust opacity if needed
    zIndex: 1,
  },
}));
