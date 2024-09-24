'use client';

import { Chip, Divider, Typography } from '@mui/material';

// local imports
import { StyledSignInWithContainer } from '@/components/styled/StyledContainers';
import Credentials from './Credentials';
import OAuth from './OAuth';

export default function SignInForm() {
  return (
    <>
      <Credentials />

      <Divider sx={{ my: 2 }}>
        <Chip label="or" />
      </Divider>

      <Typography sx={{ mb: 2 }}>Sign in with</Typography>

      <StyledSignInWithContainer>
        <OAuth />
      </StyledSignInWithContainer>
    </>
  );
}
