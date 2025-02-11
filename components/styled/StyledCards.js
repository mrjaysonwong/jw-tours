'use client';

import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledAuthCard = styled(Card)(
  ({ theme, min = 370, max = 300 }) => {
    const { palette, breakpoints } = theme;
    const isDarkMode = palette.mode === 'dark';
    const xtraSmallScreen = breakpoints.down('sm');

    return {
      width: `clamp(min(90vw, ${min}px), 50%, max(300px, ${max}px ))`,
      padding: '1rem',
      backgroundColor: isDarkMode && 'var(--color-dark)',

      [xtraSmallScreen]: {
        width: 'auto',
      },
    };
  }
);

export const StyledGridCard = styled(Card)({
  position: 'relative',
  display: 'flex',
  alignItem: 'center',

  a: { color: 'inherit' },
});
