'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { StyledContainer } from '@/components/styled/StyledContainers';
import { Box, Typography, Button } from '@mui/material';

export default function CustomError({ error, reset }) {
  const searchParams = useSearchParams();
  const isErrorPage = searchParams.get('error');
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const action = searchParams.get('action');

  const router = useRouter();

  const pathname = usePathname();
  const isMySettings = pathname.startsWith('/mysettings');

  return (
    <>
      {isMySettings ? (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '50vh',
          }}
        >
          <Typography>An error occurred while fetching data.</Typography>
          <Button
            variant="contained"
            onClick={() => location.reload()}
            sx={{ my: 2 }}
          >
            Refresh
          </Button>
        </Box>
      ) : (
        <StyledContainer
          sx={{
            alignItems: 'center',
            textAlign: 'center',
            mt: 0,
            minHeight: '100vh',
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
                token
                  ? () =>
                      router.replace(
                        `/verify?token=${token}&email=${email}&action=${action}`
                      )
                  : () => location.reload() // Attempt to recover by trying to re-render the segment
              }
            >
              Try again
            </Button>
          )}
        </StyledContainer>
      )}
    </>
  );
}
