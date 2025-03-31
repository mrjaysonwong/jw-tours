'use client';
import { Box, Grid } from '@mui/material';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import GuideDetails from './GuideDetails';
import GuideIntroduction from './GuideIntroduction';
import GuideAvailability from './GuideAvailability';
import GuideTours from './GuideTours';
import { GuideProfileProvider } from '@/contexts/GuideProfileProvider';

const GuideProfile = ({ guide, bookings, tours }) => {
  const lastNameInitial = guide.lastName.slice(0, 1);
  const name = `${guide.firstName} ${lastNameInitial}`;
  const guideAddress = guide.address
    ? `${guide.address?.city || guide.address?.name}, ${guide.address?.country}`
    : 'Manila, Philippines';

  const contextValues = {
    guide,
    bookings,
    tours,
    name,
    guideAddress,
  };

  return (
    <StyledContainer>
      <GuideProfileProvider value={contextValues}>
        <Grid
          container
          spacing={2}
          alignItems="flex-start"
          sx={{
            h5: {
              background: '-webkit-linear-gradient(20deg, #27AF60, #1CA085)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            },
          }}
        >
          <Grid item xs={12} md={3}>
            <GuideDetails />
          </Grid>

          <Grid item xs={12} md={9}>
            <GuideIntroduction />

            <Box sx={{ my: 2 }}>
              <GuideAvailability />
              <GuideTours />
            </Box>
          </Grid>
        </Grid>
      </GuideProfileProvider>
    </StyledContainer>
  );
};

export default GuideProfile;
