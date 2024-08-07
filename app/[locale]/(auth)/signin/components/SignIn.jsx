import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Box, Typography, Divider, Chip } from '@mui/material';
import {
  StyledContainer as MainContainer,
  StyledCard,
} from '@/app/components/global-styles/globals';
import { SignInWithContainer } from './styled';
import CredentialsForm from './credentials/CredentialsForm';
import OAuth from './oauth/OAuth';

export default function SignIn() {
  const t = useTranslations('SignInPage');

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
            {t('header')}
          </Typography>

          <CredentialsForm />

          <Divider sx={{ my: 2 }}>
            <Chip label="or" />
          </Divider>

          <Typography sx={{ mb: 2 }}>Sign in with</Typography>

          <SignInWithContainer>
            <OAuth />
          </SignInWithContainer>
        </StyledCard>

        <Box sx={{ my: 2, display: 'flex' }}>
          <Typography>Don&apos;t have an account?</Typography>
          <Link href="/signup">
            <Typography sx={{ ml: 1, color: 'var(--text-link-color-blue)' }}>
              Sign Up
            </Typography>
          </Link>
        </Box>
      </MainContainer>
    </>
  );
}
