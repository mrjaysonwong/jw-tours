import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Box, Typography, Button } from '@mui/material';
import Image from 'next/image';

export default function CustomError({ error, reset }) {
  const searchParams = useSearchParams();
  const isErrorPage = searchParams.get('error');

  const pathname = usePathname();
  const isMySettings = pathname.startsWith('/mysettings');

  return (
    <>
      {isMySettings ? (
        <Box
          sx={{
            height: '65vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography>An error occured. Try again.</Typography>
          <Button
            variant="contained"
            onClick={() => location.reload()}
            sx={{ my: 2 }}
          >
            Refresh
          </Button>
        </Box>
      ) : (
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
        </MainContainer>
      )}
    </>
  );
}
