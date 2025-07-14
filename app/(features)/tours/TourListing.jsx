'use client';
import { useRouter, usePathname } from 'next/navigation';
import { Typography, Grid, Box, Pagination } from '@mui/material';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import TourCard from '@/components/cards/TourCard';
import FiltersButton from '@/components/buttons/FiltersButton';
import SortBy from './SortBy';
import { cleanSlug } from '@/utils/formats/common';

const allowedParams = ['transportation', 'sort', 'page'];

const TourListing = ({
  tours,
  page,
  totalPages,
  geoLocation,
  destination,
  totalTours,
  searchParams,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleChangePage = (event, pageValue) => {
    const queryParams = new URLSearchParams();

    for (const key of allowedParams) {
      const value = searchParams[key];

      // set if allowed params
      if (value) queryParams.set(key, value);
    }

    if (pageValue === 1) {
      queryParams.delete('page');
    } else {
      queryParams.set('page', pageValue);
    }

    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography variant="h5">
            Best Tours in{' '}
            {destination ? cleanSlug(destination) : cleanSlug(geoLocation)}
          </Typography>
        </Grid>

        <Grid item xs={12} md={2} textAlign="right">
          <FiltersButton type="tour-listing" />
        </Grid>

        <Grid item xs={12}>
          <SortBy />
        </Grid>
      </Grid>

      {tours.length === 0 ? (
        <Box sx={{ height: '100vh', my: 1 }}>
          <Typography color="text.secondary">No tours found</Typography>
        </Box>
      ) : (
        <>
          <Typography color="text.secondary" sx={{ my: 1 }}>
            {totalTours} tour{totalTours > 1 ? 's' : ''} found
          </Typography>

          <Grid container spacing={2} sx={{ my: 2 }}>
            {tours.map((tour, index) => (
              <Grid key={index} item xs={12} sm={6} lg={3}>
                <TourCard tour={tour} />
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 7 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </StyledContainer>
  );
};

export default TourListing;
