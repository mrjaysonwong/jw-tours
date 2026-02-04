'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Typography, Grid, Box, Pagination, Divider } from '@mui/material';
import { StyledContainer } from '@/components/styled/StyledContainers';
import TourCard from '@/components/cards/TourCard';
import FiltersButton from '@/components/buttons/FiltersButton';
import SortBy from './SortBy';
import { cleanSlug } from '@/utils/formats/common';

const TourList = ({
  tours,
  destination,
  geoLocation,
  page,
  totalPages,
  totalTours,
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangePage = (event, pageValue) => {
    const queryParams = new URLSearchParams(searchParams);

    if (pageValue === 1) {
      queryParams.delete('page');
    } else {
      queryParams.set('page', pageValue);
    }

    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  return (
    <StyledContainer sx={{ minHeight: 'auto' }}>
      <Typography variant="h5">
        Best Tours in{' '}
        {destination ? cleanSlug(destination) : cleanSlug(geoLocation)}
      </Typography>

      <Grid container spacing={2} sx={{ my: 0.5 }}>
        <Grid item xs={12} textAlign="right">
          <FiltersButton type="tour-listing" />
        </Grid>
        <Grid item xs={12}>
          <SortBy />
        </Grid>
      </Grid>

      {tours.length === 0 ? (
        <Box
          sx={{
            height: '50vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            gap: 1,
            border: '1px solid',
            borderColor: 'divider',
            borderStyle: 'dashed',
            mt: 4
          }}
        >
          <Typography variant="h6" color="text.primary">
            No tours found
          </Typography>
          <Typography color="text.secondary">
            Please update your filters to see more results
          </Typography>
        </Box>
      ) : (
        <>
          <Typography color="text.primary" sx={{ my: 1 }}>
            {totalTours} result{totalTours > 1 ? 's' : ''}
          </Typography>

          <Divider sx={{my: 2}} />

          <Grid container spacing={2}>
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

export default TourList;
