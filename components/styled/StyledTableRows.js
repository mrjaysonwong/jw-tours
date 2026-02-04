'use client';

import { TableRow } from '@mui/material';
import { styled } from '@mui/system';

export const StyledTableRow = styled(TableRow)(
  ({ color, alphacolor }) => ({
    '& .name, & .role , & .status': {
      textTransform: 'capitalize',
    },

    '& .name': {
      width: 100,
    },

    '& .status': {
      padding: '6.4px',
      borderRadius: '6px',
      fontSize: '12px',
      fontWeight: 500,
      color: color,
      backgroundColor: alphacolor,
      textTransform: 'uppercase',
    },
  })
);
