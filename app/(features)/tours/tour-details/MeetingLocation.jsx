'use client';

import React, { useEffect, useRef, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { Box, Typography, Divider } from '@mui/material';
import { useTourDetails } from '@/contexts/TourContextProvider';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '@/constants/env';
import { getAddressParts } from '@/utils/common';

const MeetingLocation = () => {
  const { tour } = useTourDetails();
  const mapRef = useRef(null);
  const [L, setL] = useState(null);

  const meetingLocation = tour?.meetingLocation;
  const geoLocation = tour.geoLocation;
  const lat = meetingLocation?.lat;
  const lon = meetingLocation?.lon;

  const modifiedLocation = {
    ...meetingLocation,
    geoLocation,
  };

  const meetingPoint = getAddressParts(modifiedLocation, [
    'name',
    'road',
    'suburb',
    'city',
    'geoLocation',
    'country',
  ]).join(', ');

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
      zoom: 12.5,
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
      ${meetingPoint}
      </div>
    `
      )
      .openPopup();

    L.circle([lat, lon], {
      radius: 5000, // 5 km
      color: '#2d9562',
      fillColor: '#blue',
      fillOpacity: 0.1,
    }).addTo(map);

    return () => map.remove();
  }, [L, lat, lon, tour, meetingPoint]);

  if (!lat || !lon) return null;

  return (
    <>
      <Divider />
      <Typography variant="h5">Meeting Location</Typography>
      <Typography sx={{ textTransform: 'capitalize' }}>
        {meetingPoint}
      </Typography>
      <Typography color="text.secondary" variant="body2">
        You can request a different pickup location (within 5 km) during the
        checkout process.
      </Typography>

      <Box sx={{ height: 300, width: '100%', mt: 2 }}>
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
      </Box>
    </>
  );
};

export default MeetingLocation;
