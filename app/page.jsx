import React, { Suspense } from 'react';
import HeroBanner from './(homepage)/components/HeroBanner';
import SearchBooking from './(homepage)/components/SearchBooking';
import { StyledContainer as MainContainer } from './components/global-styles/globals';
import { HeroBannerSkeleton } from './components/custom/loaders/Skeleton';

export default function HomePage() {
  return (
    <>
      <HeroBanner />
    </>
  );
}
