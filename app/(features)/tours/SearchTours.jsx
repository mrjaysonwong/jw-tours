'use client';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Typography, Box, Grid, Pagination } from '@mui/material';

// internal imports
import TourCard from '@/components/cards/TourCard';
import FiltersButton from '@/components/buttons/FiltersButton';
import SortBy from './SortBy';

const SearchTours = ({
  tours,
  page,
  totalPages,
  totalTours,
  q,
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
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="right">
          <FiltersButton type="search-tours" />
        </Grid>
        <Grid item xs={12}>
          <SortBy />
        </Grid>
      </Grid>

      <Box sx={{ my: 2, display: 'flex', gap: 1, alignItems: 'flex-end' }}>
        <Typography variant="h6">&quot;{q}&quot;</Typography>
        <Typography>
          {totalTours} result{totalTours > 1 ? 's' : ''}
        </Typography>
      </Box>

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
  );
};

export default SearchTours;
