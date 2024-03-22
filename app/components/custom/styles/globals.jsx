'use client';

import { Box, Dialog } from '@mui/material';
import { styled } from '@mui/system';

export const MainContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
});

export const FormContainer = styled(Box)(({ theme }) => ({
  height: '70vh',
  width: 'clamp(250px, 50%, 280px)',
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
}));

export const StyledDialog = styled(Dialog)(({ theme }) => ({
  '.MuiDialog-paper': {
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
