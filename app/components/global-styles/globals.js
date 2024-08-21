'use client';

import { Box, Dialog, Button, Container } from '@mui/material';
import { styled } from '@mui/system';

export const StyledContainer = styled(Container)({
  marginTop: '7rem',
  minHeight: '75vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',

  '@media (orientation: landscape)': {
    height: { sm: '80vw', md: '80vw', lg: '80vh' },
  },

  a: {
    textDecoration: 'none',
  },

  'h6, h5, h4, h3': {
    fontWeight: 600,
  },
});

export const StyledCard = styled(Box)(({ theme }) => ({
  padding: '1rem',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'var(--palette-dark)'
      : 'var(--palette-light-main)',
  borderRadius: '4px',
  boxShadow:
    theme.palette.mode === 'light'
      ? 'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 1px 3px 1px'
      : undefined,

  '.recaptcha': {
    marginTop: '1rem',
    transform: 'scale(0.82)',
    transformOrigin: '0 0',
  },

  a: {
    color: 'var(--text-link-color-blue)',
  },
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
    width: 'clamp(360px, 50%, 360px)',
    background:
      theme.palette.mode === 'dark' ? 'var(--dialog-bgColor-dark)' : undefined,
  },

  '#dialog-title': {
    background: 'var(--background-color-title)',
  },

  '#dialog-button': {
    marginTop: '8px',
  },
}));

export const StyledButton = styled(Button)({
  backgroundImage: 'var(--button-gradient-blue)',
  textAlign: 'center',
  textTransform: 'uppercase',
  transition: '0.5s',
  backgroundSize: '200% auto',
  color: 'white',
  padding: 0,
  margin: 0,

  '&:hover': {
    backgroundPosition: 'right center',
    color: '#fff',
    textDecoration: 'none',
  },
});
