'use client';

import Link from 'next/link';
import { Button, Typography } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';
import { signIn, signOut } from 'next-auth/react';

export default function Home(props) {
  const data = props.user;

  return (
    <MainContainer>
      {data ? (
        <>
          <Link href="/">
            <Button variant="contained" onClick={() => signOut()}>
              Sign Out
            </Button>
          </Link>

          <Typography sx={{ my: 4 }}>Welcome {data.user.name}</Typography>
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
