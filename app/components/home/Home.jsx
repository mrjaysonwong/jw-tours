'use client';

import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';
import { signIn, signOut } from 'next-auth/react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { data: session, status } = useSession();

  console.log(session);

  return (
    <MainContainer>
      <Button
        variant="contained"
        onClick={() => (session ? signOut() : signIn())}
      >
        {session ? 'Sign Out' : 'Sign In'}
      </Button>

      <Typography sx={{ my: 4 }}>
        Welcome {session ? session.user.name : 'Guest'}
      </Typography>
    </MainContainer>
  );
}
