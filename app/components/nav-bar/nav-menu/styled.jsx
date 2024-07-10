import { Box, ListItem } from '@mui/material';
import { styled } from '@mui/system';

export const StyledListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  textTransform: 'uppercase',
  border: '1px solid var(--border-color)',
  borderWidth: '0px 0px 1px 0px',
});

export const StyledNavMenuLinks = styled(Box)(({ theme }) => ({
  backgroundColor: 'inherit',

  button: {
    textTransform: 'uppercase',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',

    ':hover': {
      color: 'var(--palette-orange)',
    },
  },

  a: {
    float: 'left',
  },

  '.dropdown': {
    float: 'left',
  },

  '.dropdown-content': {
    display: 'none',
    position: 'absolute',
    maxWidth: '370px',
  },

  '.dropdown-content a': {
    color: 'inherit',
    padding: '12px 16px',
    display: 'block',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
  },

  '.dropdown-content a:hover': {
    color: 'var(--palette-orange)',
  },

  '.dropdown:hover .dropdown-content': {
    display: 'block',
  },
}));
