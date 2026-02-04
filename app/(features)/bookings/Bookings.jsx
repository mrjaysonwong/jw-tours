import { Typography, Grid, Box } from '@mui/material';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import FiltersButton from '@/components/buttons/FiltersButton';
import SortBy from './SortBy';
import BookingList from './BookingList';

const Bookings = ({ bookings }) => {
  return (
    <StyledContainer>
      <Grid container spacing={2}>
        <Grid item xs={12} md={10}>
          <Typography variant="h5">My Bookings</Typography>
        </Grid>

        <Grid item xs={12} md={2} textAlign="right">
          <FiltersButton type="my-bookings" />
        </Grid>

        <Grid item xs={12}>
          <SortBy />
        </Grid>
      </Grid>

      {!bookings ? (
        <Box sx={{ height: '100vh', my: 1 }}>
          <Typography color="text.secondary">No bookings found</Typography>
        </Box>
      ) : (
        <>
          <Typography color="text.secondary" sx={{ my: 1 }}>
            {bookings.length} booking{bookings.length > 1 ? 's' : ''} found
          </Typography>

          <BookingList bookings={bookings} />
        </>
      )}
    </StyledContainer>
  );
};

export default Bookings;
