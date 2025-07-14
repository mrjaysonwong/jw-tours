import React from 'react';
import { Typography, Grid, Box, Pagination } from '@mui/material';

// internal imports
import { useTourListData } from '@/hooks/useTourData';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import CustomError from '@/components/errors/CustomError';
import TourCard from '@/components/cards/TourCard';

const TourGrid = () => {
  const { data: tours, isLoading, isError, error } = useTourListData();

  if (isLoading) return <LoadingSpinner h="70vh" />;

  if (isError) return <CustomError error={error} h="70vh" />;

  return (
    <>
      <Grid container spacing={3}>
        {tours.map((tour, index) => (
          <Grid key={index} item xs={12} sm={6} lg={4}>
            <TourCard tour={tour} />
          </Grid>
        ))}
        {/* {Array(12)
          .fill(tours)
          .flat()
          .map((tour, index) => (
            <Grid key={index} item xs={12} sm={6} lg={4}>
              <TourCard tour={tour} />
            </Grid>
          ))} */}
      </Grid>
    </>
  );
};

const TourList = () => {
  const { isLoading, isError } = useTourListData();
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Typography variant="h5">List</Typography>

      <TourGrid />

      <Box
        sx={{
          display: !isLoading && !isError ? 'flex' : 'none',
          justifyContent: 'center',
          my: 7,
        }}
      >
        <Pagination count={10} page={page} onChange={handleChange} />
      </Box>
    </>
  );
};

export default TourList;
