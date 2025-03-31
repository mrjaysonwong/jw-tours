import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledSidebarNav = styled('div')(({ theme }) => ({
  width: '100%',
  height: '100vh',
  color: 'inherit',

  '& ul': {
    listStyle: 'none',
    padding: '0 15px',
  },

  '& ul li': {
    padding: 8,
  },

  '& .dropdown': {
    paddingLeft: 20,
  },

  '& .dropdown li': {
    padding: '10px 16px',
    borderLeft: `1px solid ${theme.palette.divider}`,
    '&:hover': {
      color: 'var(--color-text-main)',
    },
  },

  '& .toggle-list': {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 16px',
    '&:hover': {
      color: 'var(--color-green-light)',
    },
  },

  '& .active': {
    color: 'var(--color-green-light)',
  },
}));
