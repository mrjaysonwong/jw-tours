import { auth } from '@/auth';
import { Link, redirect } from '@/navigation';
import { Box, Typography, Divider, Chip } from '@mui/material';
import {
  StyledContainer as MainContainer,
  StyledCard,
} from '@/app/components/global-styles/globals';
import { SignInWithContainer } from './components/styled';
import CredentialsForm from './components/credentials/CredentialsForm';
import OAuth from './components/oauth/OAuth';

export const metadata = {
  title: 'Sign In',
};

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    redirect('/');
  }

  return (
    <MainContainer sx={{ alignItems: 'center' }}>
      <StyledCard sx={{ width: 'clamp(300px, 50%, 300px)' }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Sign in
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

      <Box
        sx={{
          my: 2,
          div: {
            display: 'flex',
          },

          a: {
            ml: 1,
          },
        }}
      >
        <div>
          <Typography>Don&apos;t have an account?</Typography>

          <Link href="/signup">
            <Typography sx={{ color: 'var(--text-link-color-blue)' }}>
              Sign Up
            </Typography>
          </Link>
        </div>
      </Box>
    </MainContainer>
  );
}
