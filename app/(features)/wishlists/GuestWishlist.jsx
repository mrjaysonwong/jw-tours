import { useState } from 'react';
import { Box, Button, Grid, Container, Typography } from '@mui/material';

// internal imports
import { useWishlistDataContext } from '@/contexts/WishlistProvider';
import TourCard from '@/components/cards/TourCard';

const GuestWishlist = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const { wishlist } = useWishlistDataContext();
  const guestWishlist = wishlist?.guest;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {guestWishlist.tours.length > 0 ? (
          guestWishlist.tours.slice(0, visibleCount).map((tour, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <TourCard tour={tour} />
            </Grid>
          ))
        ) : (
          <Container>
            <Typography>Guest Wishlist is empty</Typography>
          </Container>
        )}
      </Grid>

      {visibleCount < guestWishlist.tours.length && (
        <Box textAlign="center">
          <Button variant="outlined" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      )}
    </>
  );
};

export default GuestWishlist;
