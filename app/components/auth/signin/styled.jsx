import { Box } from '@mui/material';
import { styled } from '@mui/system';


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
