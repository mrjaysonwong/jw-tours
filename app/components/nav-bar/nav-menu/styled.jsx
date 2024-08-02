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
    // display: 'none',
    opacity: 0,
    visibility: 'hidden',
    position: 'absolute',
    maxWidth: '370px',
    transition: 'max-height 1s ease, opacity 0.1s ease, visibility 0.3s ease',
    maxHeight: 0,
    overflow: 'hidden',
    zIndex: 1, // Ensure dropdown is above other content
  },

  '.dropdown-content a': {
    color: 'inherit',
    padding: '12px 16px',
    textAlign: 'left',
    textTransform: 'uppercase',
    fontSize: '0.9rem',
    fontWeight: '500',
  },

  '.dropdown-content a:hover': {
    color: 'var(--palette-orange)',
  },

  '.dropdown:hover .dropdown-content': {
    maxHeight: '500px', // Adjust as needed based on your content height
    opacity: 1,
    visibility: 'visible',
  },
}));
