'use client';

import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { UserSessionContext } from '@/context/UserSessionWrapper';

export default function Welcome() {
  const session = useContext(UserSessionContext);
  const user = session?.user;

  return (
    <>
      <MainContainer>
        <Typography sx={{ mt: 4 }}>
          Welcome {user ? user?.name : 'Guest'}
        </Typography>
        <Typography>{user?.email}</Typography>
      </MainContainer>
    </>
  );
}
