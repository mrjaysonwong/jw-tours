import { Box, ListItem } from '@mui/material';
import { styled } from '@mui/system';

export const StyledListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--border-color)',
  borderWidth: '0px 0px 1px 0px',
});

export const StyledNavMenuLinks = styled(Box)(({ theme }) => ({
  backgroundColor: 'inherit',

  button: {
    textTransform: 'none',
    color: theme.palette.mode === 'dark' ? 'white' : 'black',

    ':hover': {
      color: 'var(--palette-light-orange)',
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
  },

  '.dropdown-content a:hover': {
    color: '#e3a393',
  },

  '.dropdown:hover .dropdown-content': {
    display: 'block',
  },
}));
