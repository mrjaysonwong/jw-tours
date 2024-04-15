import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const SignInWithContainer = styled(Box)({
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
    backgroundColor: 'var(--palette-light)',
  },

  '.btn-github': {
    backgroundColor: 'var(--palette-dark-main)',
  },

  '.btn-facebook': {
    backgroundColor: 'var(--palette-pastel-blue)',
  },
  '.btn-email': {
    backgroundColor: 'var(--palette-light)',
  },
});
