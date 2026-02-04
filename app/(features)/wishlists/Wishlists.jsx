'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Typography, Box, Button } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import CustomTab from '@/components/tabs/CustomTab';
import { WishlistDataProvider } from '@/contexts/WishlistProvider';
import { useUserSessionContext } from '@/contexts/UserProvider';
import { wishListTabComponents } from '@/constants/componentMaps/componentMaps';

const Wishlists = ({ wishlist }) => {
  const guestWishlist = wishlist?.guest?.tours;
  const userWishlist = wishlist?.user?.tours;

  const [value, setValue] = useState(0);

  const session = useUserSessionContext();

  const contextValues = {
    wishlist,
    value,
  };

  const tabContent = [
    {
      label: `Guest Wishlist (${guestWishlist.length})`,
    },
  ];

  if (session) {
    tabContent.push({
      label: `My Wishlist (${userWishlist.length ?? 0})`,
    });
  }

  return (
    <StyledContainer>
      <Typography variant="h5">Wishlists</Typography>

      {guestWishlist.length === 0 && userWishlist.length === 0 ? (
        <Box
          sx={{
            mt: 'auto',
            textAlign: 'center',
            display: 'flex',
            height: '60vh',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <FavoriteBorderOutlinedIcon sx={{ fontSize: '4rem' }} />
          <Typography variant="h6">Nothing here yet</Typography>
          <Typography>
            Save activities to your wishlist by clicking on the heart icon.
          </Typography>

          <Link href="/tours">
            <Button variant="contained" sx={{ my: 1 }}>
              Expore Tours
            </Button>
          </Link>
        </Box>
      ) : (
        <Box sx={{ mt: 'auto', minHeight: '100vh' }}>
          <WishlistDataProvider value={contextValues}>
            <CustomTab
              value={value}
              setValue={setValue}
              ariaLabel="wishlist tabs"
              tabContent={tabContent}
              tabPanelComponents={wishListTabComponents}
            />
          </WishlistDataProvider>
        </Box>
      )}
    </StyledContainer>
  );
};

export default Wishlists;
