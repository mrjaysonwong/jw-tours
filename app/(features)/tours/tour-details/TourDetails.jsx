'use client';

import { Grid, useScrollTrigger, Box } from '@mui/material';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import {
  TourHeader,
  TourImageGallery,
  TourGuideSnippet,
  AboutThisTour,
  TourOverview,
  Inclusions,
  MeetingLocation,
  Itinerary,
  ImportantInfo,
  TourBookingCard,
  TourReviews,
} from '.';
import { TourDetailsProvider } from '@/contexts/TourContextProvider';

export const TourDetails = ({ tour, bookings }) => {
  const contextValues = { tour, bookings };

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const styledGrid = {
    '& ul': { paddingLeft: '1.5rem', marginTop: '0.5rem' },
    '& ol': { paddingLeft: '1.5rem', marginTop: '0.5rem' },
    '& li': { marginBottom: '0.1rem' },

    h5: {
      background: '-webkit-linear-gradient(20deg, #27AF60, #1CA085)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    },
  };

  return (
    <StyledContainer sx={{ position: 'relative' }}>
      <TourDetailsProvider value={contextValues}>
        <Grid container spacing={4} alignItems="flex-start" sx={styledGrid}>
          <Grid item xs={12} md={8} sx={{ hr: { my: 5 } }}>
            <TourHeader />
            <TourImageGallery />
            <Box sx={{ display: { md: 'none' }, my: 4 }}>
              <TourBookingCard />
            </Box>
            <TourGuideSnippet />
            <AboutThisTour />
            <TourOverview />
            <Inclusions />
            <MeetingLocation />
            <Itinerary />
            <ImportantInfo />
          </Grid>

          <Grid
            item
            md={4}
            sx={{
              display: { xs: 'none', md: 'flex' },
              position: 'sticky',
              top: trigger && 65,
            }}
          >
            <TourBookingCard />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TourReviews />
          </Grid>
        </Grid>
      </TourDetailsProvider>
    </StyledContainer>
  );
};

export default TourDetails;
