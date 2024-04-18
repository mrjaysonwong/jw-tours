'use client';

import Link from 'next/link';
import { Box, Typography, Divider, Chip } from '@mui/material';
import {
  MainContainer,
  AuthCard,
} from '@/app/components/global-styles/globals';
import { SignInWithContainer } from './styled';
import CredentialsForm from './credentials/CredentialsForm';
import OAuth from './oauth/OAuth';

export default function SignIn() {
  return (
    <>
      <MainContainer sx={{ minHeight: '80vh' }}>
        <AuthCard sx={{ width: 'clamp(280px, 50%, 280px)', mt: 5 }}>
          <Typography variant="h5">Sign in</Typography>
          <CredentialsForm />

          <Divider sx={{ my: 2 }}>
            <Chip label="or" />
          </Divider>

          <Typography sx={{ mb: 2 }}>Sign in with</Typography>

          <SignInWithContainer>
            <OAuth />
          </SignInWithContainer>
        </AuthCard>

        <Box sx={{ my: 2, display: 'flex' }}>
          <Typography>Don&apos;t have an account?</Typography>
          <Link href="/signup" replace>
            <Typography sx={{ ml: 1, color: 'var(--text-link-color-blue)' }}>
              Sign Up
            </Typography>
          </Link>
        </Box>
      </MainContainer>
    </>
  );
}
