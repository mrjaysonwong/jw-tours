import { styled } from '@mui/system';
import { Box } from '@mui/material';

export const StyledInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  export const CropperContainer = styled(Box)({
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: '80px',
  });

  export const SliderContainer = styled(Box)({
    position: 'absolute',
    bottom: 0,
    left: '50%',
    width: '50%',
    transform: 'translateX(-50%)',
    height: 80,
    display: 'flex',
    alignItems: 'center',
  });