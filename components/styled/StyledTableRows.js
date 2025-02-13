'use client';

import { TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const StyledUserListTableRow = styled(TableRow)(
  ({ color, alphacolor }) => {
    return {
      '.name, .role , .status': {
        textTransform: 'capitalize',
      },

      '.name': {
        width: 100,
      },

      '.status': {
        padding: '6.4px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: 550,
        color: color,
        backgroundColor: alphacolor,
      },
    };
  }
);
