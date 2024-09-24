import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import { useTranslations } from 'next-intl';
import { StyledAuthContainer } from '@/components/styled/StyledContainers';
import { createMetadata } from '@/helpers/metaDataHelpers';

export function generateMetadata({ params: { locale } }) {
  return createMetadata(
    locale,
    'notifications_page',
    'meta_title.notifications'
  );
}

export default function AuthenticationFailedPage() {
  const t1 = useTranslations('common');

  return (
    <StyledAuthContainer sx={{ textAlign: 'center' }}>
      <ErrorIcon color="error" sx={{ fontSize: '4rem' }} />
      <Typography variant="h4" sx={{ m: 2, fontWeight: 500 }}>
        {t1('headers.auth_failed')}
      </Typography>
      <Typography>{t1('paragraphs.invalid_verification_link')}</Typography>
      <Typography>{t1('subheaders.try_auth_again')}</Typography>
    </StyledAuthContainer>
  );
}
