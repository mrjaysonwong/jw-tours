'use client';

// third party imports
import { useEffect } from 'react';
import Image from 'next/image';
import { Typography, Button } from '@mui/material';
import { StyledMainContainer } from '../styled/StyledContainers';

const CustomError = ({ error, reset, h = '50dvh' }) => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <StyledMainContainer sx={{ minHeight: h }}>
      <Image
        src={'/assets/robot-error.png'}
        width={70}
        height={70}
        priority
        alt="robot-error"
      />

      <Typography>{error?.message ?? 'Something went wrong.'}</Typography>
      <Button
        size="small"
        variant="contained"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => (reset ? reset() : location.reload())
        }
        sx={{ my: 2 }}
      >
        Try again
      </Button>
    </StyledMainContainer>
  );
};

export default CustomError;
