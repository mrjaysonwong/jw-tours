'use client';

import { Box, Dialog, Button } from '@mui/material';
import { styled } from '@mui/system';

export const MainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: ' calc(100vw - 1px)',

  h5: {
    fontWeight: 500,
    marginBottom: '1rem',
  },
});

export const AuthCard = styled(Box)(({ theme }) => ({
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

  '.legal': {
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
