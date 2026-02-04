'use client';
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { Box, IconButton, Tabs, Tab } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import { useMessageStore } from '@/stores/messageStore';
import { useUserSessionContext } from '@/contexts/UserProvider';
import { useWishlistActions } from '@/hooks/useWishlistActions';

function CustomNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        right: 5,
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

function CustomPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: 'block',
        position: 'absolute',
        left: 5,
        zIndex: 1,
      }}
      onClick={onClick}
    />
  );
}

const TourImageGallery = () => {
  const { tour } = useTourDetails();

  const [value, setValue] = useState(0);
  const slider1Ref = useRef(null);

  const { handleAlertMessage } = useMessageStore();

  const guestWishlist = tour?.wishlist?.guest;
  const userWishlist = tour?.wishlist?.user;

  const tourIds = new Set([
    ...(guestWishlist?.tours?.map((t) => t._id) || []),
    ...(userWishlist?.tours?.map((t) => t._id) || []),
  ]);

  const inWishlist = tourIds.has(tour._id);

  const session = useUserSessionContext();
  const target = 'all';

  const { handleClickFavorite } = useWishlistActions(handleAlertMessage);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    slider1Ref.current.slickGoTo(newValue); // Sync with the main slider
  };

  const mainSliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setValue(index), // Sync with the active tab
    ref: (slider) => (slider1Ref.current = slider),
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <Box sx={{ position: 'relative', my: 2 }}>
      <Slider {...mainSliderSettings}>
        {tour.images.map((slide, index) => (
          <div key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '400px',
                overflow: 'hidden',
                borderRadius: '8px',
              }}
            >
              <Image
                src={slide.url}
                alt="Tour image"
                sizes="100vw"
                fill
                style={{
                  objectFit: 'cover',
                }}
              />
            </Box>
          </div>
        ))}
      </Slider>

      <Box sx={{ my: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          scrollButtons={false}
          aria-label="tour image tabs"
        >
          {tour.images.map((slide, index) => (
            <Tab
              key={index}
              disableRipple
              label={
                <Box
                  sx={{
                    width: '100px',
                    height: '60px',
                    borderRadius: '4px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  <Image
                    src={slide.url}
                    alt="Tour image"
                    width={100}
                    height={60}
                    style={{ objectFit: 'cover' }}
                  />
                </Box>
              }
            />
          ))}
        </Tabs>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          top: 16,
          right: 16,
          zIndex: 1,
          display: 'flex',
          gap: 1,
        }}
      >
        <IconButton
          aria-label="add to favorites"
          disableRipple
          onClick={(e) =>
            handleClickFavorite(e, tour._id, inWishlist, session, target)
          }
          sx={{
            bgcolor: 'white',
            '& svg': {
              color: inWishlist ? 'var(--color-dark-red)' : 'black',
            },
          }}
        >
          {inWishlist ? <FavoriteIcon /> : <FavoriteBorderOutlinedIcon />}
        </IconButton>
        <IconButton aria-label="share" disableRipple sx={{ bgcolor: 'white' }}>
          <ShareIcon sx={{ color: 'black' }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TourImageGallery;
