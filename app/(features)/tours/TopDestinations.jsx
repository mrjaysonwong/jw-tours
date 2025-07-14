'use client';
import React from 'react';
import Link from 'next/link';
import { Grid, Typography, Box, Card } from '@mui/material';
import TravelExploreOutlinedIcon from '@mui/icons-material/TravelExploreOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import { formatUrl } from '@/utils/formats/common';

const TopDestinations = ({ tours }) => {
  const uniqueTours = Array.from(
    new Map(tours.map((tour) => [tour.geoLocation, tour])).values()
  );

  return (
    <StyledContainer>
      {tours.length === 0 ? (
        <Typography variant="h6" textAlign="center">
          No tours yet
        </Typography>
      ) : (
        <>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              my: 2,
            }}
          >
            <TravelExploreOutlinedIcon
              sx={{ fontSize: '3.5rem', color: '#1CA085' }}
            />
            <Typography
              variant="h5"
              sx={{
                background: '-webkit-linear-gradient(120deg, #27AF60, #1CA085)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Top Destinations
            </Typography>
          </Box>

          <Grid container spacing={2}>
            {uniqueTours.map((tour, index) => {
              const href = `/tours/${formatUrl(tour.geoLocation)}`;

              return (
                <Grid key={index} item xs={6} sm={4} lg={2}>
                  <Link href={href}>
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        p: 1.5,
                      }}
                    >
                      <PlaceOutlinedIcon sx={{ mr: 1 }} />
                      <Typography
                        sx={{
                          textTransform: 'capitalize',
                          fontWeight: 500,
                          lineHeight: '120%',
                        }}
                      >
                        {tour.geoLocation}
                      </Typography>
                    </Card>
                  </Link>
                </Grid>
              );
            })}
          </Grid>
        </>
      )}
    </StyledContainer>
  );
};

export default TopDestinations;
