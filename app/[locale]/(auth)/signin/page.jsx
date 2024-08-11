import { auth } from '@/auth';
import { getTranslations } from 'next-intl/server';
import { Link, redirect } from '@/navigation';
import { Box, Typography, Divider, Chip } from '@mui/material';
import {
  StyledContainer as MainContainer,
  StyledCard,
} from '@/app/components/global-styles/globals';
import { SignInWithContainer } from './components/styled';
import CredentialsForm from './components/credentials/CredentialsForm';
import OAuth from './components/oauth/OAuth';
import { createMetadata } from '@/utils/helper/common';

export async function generateMetadata({ params: { locale } }) {
  return createMetadata(locale, 'signin_page', 'meta_title.signin');
}

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  const t = await getTranslations('signin_page');

  return (
    <>
      <MainContainer
        sx={{
          mt: { xs: 0, md: 5 },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledCard sx={{ width: 'clamp(280px, 50%, 280px)' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            {t('headers.signin')}
          </Typography>

          <CredentialsForm />

          <Divider sx={{ my: 2 }}>
            <Chip label={t('labels.or')} />
          </Divider>

          <Typography sx={{ mb: 2 }}>{t('paragraphs.signin_with')}</Typography>

          <SignInWithContainer>
            <OAuth />
          </SignInWithContainer>
        </StyledCard>

        <Box sx={{ my: 2, display: 'flex' }}>
          <Typography>{t('paragraphs.dont_have_account')}</Typography>
          <Link href="/signup">
            <Typography sx={{ ml: 1, color: 'var(--text-link-color-blue)' }}>
              {t('paragraphs.signup')}
            </Typography>
          </Link>
        </Box>
      </MainContainer>
    </>
  );
}