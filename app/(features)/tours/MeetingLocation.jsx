'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, Divider } from '@mui/material';
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '@/constants/common';

const MeetingLocation = () => {
  const { tour } = useTourDetails();
  const mapRef = useRef(null);
  const [L, setL] = useState(null);

  const lat = tour?.meetingLocation?.lat;
  const lon = tour?.meetingLocation?.lon;

  // Load Leaflet dynamically
  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  useEffect(() => {
    if (!L || !lat || !lon || !mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [lat, lon],
      zoom: 17,
      zoomSnap: 0.25, // Smooth zooming
    });

    // Use Mapbox tiles with @2x for high resolution
    L.tileLayer(
      `https://api.mapbox.com/styles/v1/${MAPBOX_STYLE_ID}/tiles/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`,
      {
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512, // Default Mapbox tile size
        zoomOffset: -1, // Corrects zoom levels for Mapbox
        maxZoom: 20,
      }
    ).addTo(map);

    // Fix missing marker icon
    const markerIcon = new L.Icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
      iconSize: [36, 36],
      iconAnchor: [18, 36],
      popupAnchor: [0, -30],
      shadowUrl:
        'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      shadowSize: [50, 50],
      shadowAnchor: [15, 48],
    });

    // Add marker
    L.marker([lat, lon], { icon: markerIcon })
      .addTo(map)
      .bindPopup(
        `
      <div style="text-transform: capitalize">
        <strong>${tour.meetingLocation.name}</strong><br>
        ${tour.meetingLocation?.city}<br>
        ${tour.destination.geoLocation}, ${tour.meetingLocation.country}
      </div>
    `
      )
      .openPopup();

    return () => map.remove();
  }, [L, lat, lon, tour]);

  if (!lat || !lon) return null;

  return (
    <>
      <Divider />
      <Typography variant="h5">Meeting Location</Typography>
      <Typography sx={{ textTransform: 'capitalize' }}>
        {`${tour.meetingLocation.name}, ${tour.meetingLocation.city}, ${tour.destination.geoLocation}, ${tour.meetingLocation.country}`}
      </Typography>
      <Box sx={{ height: 300, width: '100%', mt: 2 }}>
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      </Box>
    </>
  );
};

export default MeetingLocation;
