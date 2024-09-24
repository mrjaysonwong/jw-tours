'use client';

import { Box } from '@mui/material';
import { styled } from '@mui/system';

export const StyledHeroOverlay = styled(Box)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
  backgroundColor: 'rgba(0,0,0,0.3)',
  boxShadow: 'inset 0px -70px 20px rgba(0, 0, 0, 0.6)',
});
