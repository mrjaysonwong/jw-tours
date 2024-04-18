'use client';

import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { MainContainer } from '@/app/components/global-styles/globals';
import { UserSessionContext } from '@/context/UserSessionWrapper';

export default function Welcome() {
  const session = useContext(UserSessionContext);
  const user = session?.user;

  return (
    <MainContainer sx={{ minHeight: '80vh' }}>
      <Typography sx={{ my: 4 }}>
        Welcome {user ? user?.name : 'Guest'}
      </Typography>
    </MainContainer>
  );
}
