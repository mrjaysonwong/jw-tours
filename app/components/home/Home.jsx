'use client';

import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';
import { signIn, signOut } from 'next-auth/react';

export default function Home({ session }) {
  return (
    <MainContainer>
      {session ? (
        <>
          <Button variant="contained" onClick={() => signOut()}>
            Sign Out
          </Button>

          <Typography sx={{ my: 4 }}>Welcome {session.user.name}</Typography>
        </>
      ) : (
        <>
          <Button variant="contained" onClick={() => signIn()}>
            Sign In
          </Button>

          <Typography sx={{ my: 4 }}>Welcome Guest</Typography>
        </>
      )}
    </MainContainer>
  );
}
