import React from 'react';
import { usePathname } from 'next/navigation';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Grid,
  Box,
  Divider,
} from '@mui/material';

// internal imports
import {
  useCreateTourContext,
  useTourDetails,
} from '@/contexts/TourContextProvider';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import {
  Overview,
  ImagesContent,
  Title,
  Destination,
  Itinerary,
  MeetingLocation,
  Capacity,
  Pricing,
  EnableFreeCancellation,
  TourGuideSelection,
  TourAvailability,
  Transportation,
  TourInclusions,
  ImportantInformation,
} from '.';
import { getLastSegment } from '@/helpers/pageHelpers';

const componentLookup = {
  Title: Title,
  Overview: Overview,
  Images: ImagesContent,
  Destination: Destination,
  Itinerary: Itinerary,
  'Meeting Location': MeetingLocation,
  Capacity: Capacity,
  Pricing: Pricing,
  'Tour Cancellation': EnableFreeCancellation,
  'Tour Guide': TourGuideSelection,
  'Tour Availability': TourAvailability,
  Transportation: Transportation,
  'Tour Inclusions': TourInclusions,
  'Important Information': ImportantInformation,
};

const detailsSection = [
  'Title',
  'Overview',
  'Images',
  'Destination',
  'Itinerary',
  'Meeting Location',
];

const propertiesSection = [
  'Capacity',
  'Pricing',
  'Tour Cancellation',
  'Tour Guide',
  'Tour Availability',
  'Transportation',
  'Tour Inclusions',
  'Important Information',
];

export const useTourFormContext = () => {
  const createTourContext = useCreateTourContext();
  const tourDetailsContext = useTourDetails();

  if (!createTourContext && !tourDetailsContext) {
    throw new Error('useTourFormContext must be used within a Tour Provider');
  }

  return createTourContext || tourDetailsContext;
};

const CardForm = () => {
  const { handleSubmit, onSubmit, isSubmitting } = useTourFormContext();
  const pathname = usePathname();
  const lastSegment = getLastSegment(pathname);

  return (
    <Card elevation={0} sx={{ bgcolor: 'transparent' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Details"
                titleTypographyProps={{
                  fontSize: '1.2rem',
                  fontWeight: 500,
                }}
                subheader="Title, Overview, Images..."
                subheaderTypographyProps={{ fontSize: '0.9rem' }}
              />

              <Divider />

              <CardContent>
                {detailsSection.map((componentName, index) => {
                  const Component = componentLookup[componentName];
                  return (
                    <Box key={componentName}>
                      <Divider
                        sx={{
                          display: index === 0 ? 'none' : '',
                        }}
                      />
                      <Box sx={{ my: 2 }}>
                        <Typography>{componentName}</Typography>
                        <Component />
                      </Box>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader
                title="Properties"
                titleTypographyProps={{
                  fontSize: '1.2rem',
                  fontWeight: 500,
                }}
                subheader="Additional functions and attributes..."
                subheaderTypographyProps={{ fontSize: '0.9rem' }}
              />

              <Divider />

              <CardContent>
                {propertiesSection.map((componentName, index) => {
                  const Component = componentLookup[componentName];
                  return (
                    <Box key={componentName}>
                      <Divider
                        sx={{
                          display: index === 0 ? 'none' : '',
                        }}
                      />
                      <Box sx={{ my: 2 }}>
                        <Typography>{componentName}</Typography>
                        <Component />
                      </Box>
                    </Box>
                  );
                })}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <CardActions sx={{ p: 2 }}>
          <FormSubmitButton
            label={lastSegment === 'new' ? 'Submit' : 'Save changes'}
            isSubmitting={isSubmitting}
          />
        </CardActions>
      </form>
    </Card>
  );
};

export default CardForm;
