import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function CustomError({ error, reset }) {
  const searchParams = useSearchParams();
  const isErrorPage = searchParams.get('error');

  return (
    <MainContainer
      sx={{
        mt: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <>
        <Image
          src={'/assets/robot-error.png'}
          width={70}
          height={70}
          priority
          alt="robot-error"
        />
        <Typography sx={{ my: 1 }}>Something went wrong!</Typography>

        {isErrorPage ? (
          <Link href="/signin">
            <Button>Try again</Button>
          </Link>
        ) : (
          <Button
            variant="text"
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        )}
      </>
    </MainContainer>
  );
}
