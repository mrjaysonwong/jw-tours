'use client';
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';
import { Box, IconButton, Tabs, Tab } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';

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

  const [value, setValue] = useState(0); // State for the active tab
  const slider1Ref = useRef(null);

  const handleChange = (event, newValue) => {
    setValue(newValue); // Update the active tab
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
      {/* Main Slider */}
      <Slider {...mainSliderSettings}>
        {tour.images.map((slide, index) => (
          <div key={index}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '400px', // Fixed height for all images
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

      {/* Thumbnail Tabs */}
      <Box sx={{ my: 1 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          aria-label="scrollable image tabs"
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

      {/* Action Buttons */}
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
          sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <FavoriteIcon />
        </IconButton>
        <IconButton
          aria-label="share"
          sx={{ color: 'white', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
        >
          <ShareIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TourImageGallery;
