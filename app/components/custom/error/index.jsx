import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Box, Typography, Button, Tooltip } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslations } from 'next-intl';

// Use-case for session only
export function ErrorTooltip() {
  const t = useTranslations('custom_error_page');

  return (
    <Tooltip title={t('paragraphs.error_while_fetching')} arrow>
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

  const t = useTranslations('custom_error_page');

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
          <Typography sx={{ my: 1 }}>
            {t('paragraphs.something_went_wrong')}
          </Typography>

          {isErrorPage ? (
            <Link href="/signin">
              <Button>{t('button_labels.try_again')}</Button>
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
              {t('button_labels.try_again')}
            </Button>
          )}
        </MainContainer>
      )}
    </>
  );
}
