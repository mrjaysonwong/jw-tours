'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

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

export const SignInWithContainer = styled(Box)({
  '.oauth, .btn-email': {
    marginBottom: '0.8rem',
    textTransform: 'none',
  },

  '.btn-google, .btn-email': {
    backgroundColor: 'var(--palette-light)',
    color: 'black',
    '&:hover': {
      backgroundColor: 'var(--palette-light)',
    },
  },

  '.btn-github': {
    backgroundColor: 'var(--palette-dark-main)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'var(--palette-dark-main)',
    },
  },

  '.btn-facebook': {
    backgroundColor: 'var(--palette-pastel-blue)',
    color: 'white',
    '&:hover': {
      backgroundColor: 'var(--palette-pastel-blue)',
    },
  },
});
