import { useState } from 'react';
import { Box, Button, Grid, Container, Typography } from '@mui/material';

// internal imports
import { useWishlistDataContext } from '@/contexts/WishlistProvider';
import TourCard from '@/components/cards/TourCard';

const UserWishlist = () => {
  const [visibleCount, setVisibleCount] = useState(8);
  const { wishlist } = useWishlistDataContext();
  const userWishlist = wishlist?.user;

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 8);
  };

  return (
    <>
      <Grid container spacing={2} sx={{ mb: 5 }}>
        {userWishlist.tours.length > 0 ? (
          userWishlist.tours.slice(0, visibleCount).map((tour, index) => (
            <Grid key={index} item xs={12} sm={6} lg={3}>
              <TourCard tour={tour} />
            </Grid>
          ))
        ) : (
          <Container>
            <Typography>My Wishlist is empty</Typography>
          </Container>
        )}
      </Grid>

      {visibleCount < userWishlist.tours.length && (
        <Box textAlign="center">
          <Button variant="outlined" onClick={handleShowMore}>
            Show More
          </Button>
        </Box>
      )}
    </>
  );
};

export default UserWishlist;
