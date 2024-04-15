import { MainContainer } from '@/app/components/global-styles/globals';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function CustomError({ error, reset }) {
  return (
    <MainContainer>
      <Image
        src={'/assets/robot-error.png'}
        width={70}
        height={70}
        priority
        alt="robot-error"
      />
      <Typography sx={{ my: 1 }}>Something went wrong!</Typography>
      <Button
        variant="text"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </Button>
    </MainContainer>
  );
}
