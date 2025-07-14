import { Typography, Box } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslations } from 'next-intl';
import { StyledMainContainer } from '@/components/styled/StyledContainers';
import { createMetadata } from '@/helpers/metadataHelpers';

// export function generateMetadata({ params: { locale } }) {
//   return createMetadata(
//     locale,
//     'notifications_page',
//     'meta_title.notifications'
//   );
// }

export default function AuthenticationFailedPage() {
  const t1 = useTranslations('common');

  return (
    <StyledMainContainer>
      <ErrorIcon color="error" sx={{ fontSize: '4rem' }} />

      <Box textAlign="center">
        <Typography variant="h4" sx={{ my: 2 }}>
          {t1('headers.auth_failed')}
        </Typography>

        <Typography>{t1('paragraphs.invalid_verification_link')}</Typography>
        <Typography>{t1('subheaders.try_auth_again')}</Typography>
      </Box>
    </StyledMainContainer>
  );
}
