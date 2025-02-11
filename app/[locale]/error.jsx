'use client';

// third party imports
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Typography, Button } from '@mui/material';
import { StyledMainContainer } from '@/components/styled/StyledContainers';

const Error = ({ error, reset, hasQueryError }) => {
  const router = useRouter();

  const handleTryAgain = () => {
    if (reset) {
      reset();
    } else if (hasQueryError) {
      router.replace('/signin', { scroll: false });
    } else {
      location.reload();
    }
  };

  useEffect(() => {
    // log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <StyledMainContainer>
      <Image
        src={'/assets/robot-error.png'}
        width={70}
        height={70}
        priority
        alt="robot-error"
      />

      <Typography>Something went wrong!</Typography>
      <Button
        size="small"
        variant="contained"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => handleTryAgain()
        }
        sx={{ my: 2 }}
      >
        Try again
      </Button>
    </StyledMainContainer>
  );
};

export default Error;
