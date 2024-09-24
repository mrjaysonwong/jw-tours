import { ListItem } from '@mui/material';
import { styled } from '@mui/system';

export const StyledNavListItem = styled(ListItem)({
  display: 'flex',
  flexDirection: 'column',
  textTransform: 'uppercase',
  border: '1px solid var(--border-color)',
  borderWidth: '0px 0px 1px 0px',

  div: {
    width: '100%',
  },
});
