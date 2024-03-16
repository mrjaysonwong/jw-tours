'use client';

import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';


export default function SignUp() {
  return (
    <MainContainer>
      <Link href="/">
        <Button variant="contained">Home</Button>
      </Link>
      <Typography>Sign Up Page</Typography>
    </MainContainer>
  );
}
