'use client';

import { Card } from '@mui/material';
import { styled } from '@mui/system';

export const StyledAuthCard = styled(Card)(
  ({ theme, min = 360, max = 300 }) => {
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

export const StyledGridCard = styled(Card)(({ theme }) => {
  const { palette } = theme;
  const isDarkMode = palette.mode === 'dark';

  return {
    position: 'relative',
    display: 'flex',
    alignItem: 'center',
    backgroundColor: isDarkMode && 'var(--color-dark)',

    '&:hover': {
      color: 'var(--color-text-main)',
    },
  };
});
