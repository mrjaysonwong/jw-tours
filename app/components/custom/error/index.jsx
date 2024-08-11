import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

// Use-case for session only
export function ErrorTooltip() {
  return (
    <Tooltip title="Error while fetching data." arrow>
      <ErrorIcon color="error" sx={{ fontSize: '2rem' }} />
    </Tooltip>
  );
}

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
            my: 5,
          }}
        >
          <Typography>{error.message}</Typography>
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
                token
                  ? () =>
                      router.replace(
                        `/verify?token=${token}&email=${email}&action=${action}`
                      )
                  : () => reset() // Attempt to recover by trying to re-render the segment
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
