import React, { Suspense } from 'react';
import Home from './(homepage)/Home';
import Image from 'next/image';

import { Typography, Box } from '@mui/material';
import HeroBanner from './(homepage)/components/HeroBanner';
import SearchBooking from './(homepage)/components/SearchBooking';

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

      <Home>
        <HeroBanner />
        {/* <SearchBooking /> */}
      </Home>

      {/* </Suspense> */}
    </>
  );
}
