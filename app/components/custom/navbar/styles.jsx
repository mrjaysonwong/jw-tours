import { Box, ListItem } from '@mui/material';
import { styled } from '@mui/system';

export const LinkContainer = styled(Box)(
  ({ open, nested, selected, pathname }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: '8px',

    backgroundColor:
      open && nested && selected === pathname
        ? 'var(--hover-bgcolor)'
        : undefined,
    borderRadius: open && selected === pathname ? '24px' : undefined,

    ':hover': {
      backgroundColor: 'var(--hover-bgcolor)',
      borderRadius: '24px',
    },
  })
);

export const NestedLinkContainer = styled(Box)(({ theme }) => ({
  position: 'absolute',
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'var(--palette-dark)'
      : 'var(--palette-light-main)',
  borderRadius: '4px',
  marginTop: '8px',
}));

export const StyledListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  border: '1px solid var(--border-color)',
  borderWidth: '0px 0px 1px 0px',
});
