import React, { Suspense } from 'react';
import Home from './(homepage)/Home';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import { Typography } from '@mui/material';

export default function HomePage() {
  return (
    <>
      {/* <Suspense
        fallback={
          <MainContainer>
            <Typography>Loading...</Typography>
          </MainContainer>
        }
      > */}
        <Home />
      {/* </Suspense> */}
    </>
  );
}
