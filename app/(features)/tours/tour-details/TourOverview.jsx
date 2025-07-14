import { Typography, Divider } from '@mui/material';

// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';

const TourOverview = () => {
  const { tour } = useTourDetails();

  return (
    <>
      <Divider />

      <Typography variant="h5" sx={{ my: 1 }}>
        Overview
      </Typography>

      <div dangerouslySetInnerHTML={{ __html: tour.overview }} />
    </>
  );
};

export default TourOverview;
