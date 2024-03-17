'use client';

import { Button, Typography } from '@mui/material';
import { MainContainer } from '@/app/components/layout/styles/globals';
import { signIn, signOut } from 'next-auth/react';


export default function Home(props) {
  const session = props.user;

  // const { data: session, status } = useSession();
  // const isAuthenticated = status === 'authenticated';
  const isAuthenticated = session && session.user;

  return (
    <MainContainer>
      <Button
        variant="contained"
        onClick={() => (isAuthenticated ? signOut() : signIn())}
      >
        {isAuthenticated ? 'Sign Out' : 'Sign In'}
      </Button>

      <Typography sx={{ my: 4 }}>
        Welcome {isAuthenticated ? session.user.name : 'Guest'}
      </Typography>
    </MainContainer>
  );
}
