'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Grid, TextField, Autocomplete, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import 'leaflet/dist/leaflet.css';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import ErrorText from '@/components/errors/ErrorText';
import { usePlacesData } from '@/hooks/usePlacesData';
import { getAddressParts } from '@/utils/common';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '@/constants/common';

const MeetingLocation = () => {
  const { control, errors, watch } = useCreateTourContext();
  const meetingLocationV = watch('meetingLocation');
  const mapRef = useRef(null);
  const [L, setL] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 700);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const {
    data: suggestions = [],
    isLoading,
    isError,
    error,
  } = usePlacesData(debouncedText);

  useEffect(() => {
    if (!meetingLocationV) {
      setSelectedLocation(null);
      setSearchTerm('');
    }
  }, [meetingLocationV]);

  // Load Leaflet dynamically
  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet);
    });
  }, []);

  useEffect(() => {
    if (!L || !selectedLocation || !mapRef.current) return;

    const map = L.map(mapRef.current, {
      center: [selectedLocation.lat, selectedLocation.lon],
      zoom: 17,
      zoomSnap: 0.25,
    });

    L.tileLayer(
      `https://api.mapbox.com/styles/v1/${MAPBOX_STYLE_ID}/tiles/{z}/{x}/{y}@2x?access_token=${MAPBOX_ACCESS_TOKEN}`,
      {
        attribution: '&copy; <a href="https://www.mapbox.com/">Mapbox</a>',
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 20,
      }
    ).addTo(map);

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

    L.marker([selectedLocation.lat, selectedLocation.lon], { icon: markerIcon })
      .addTo(map)
      .bindPopup(
        `
      <div style="text-transform: capitalize">
     ${getAddressParts(selectedLocation).join(', ')}
      </div>
    `
      )
      .openPopup();

    return () => map.remove();
  }, [L, selectedLocation]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = suggestions.map((option) => ({
    name: option.address.name,
    neighbourhood: option.address.neighbourhood,
    city: option.address.city,
    state: option.address.state,
    postcode: option.address.postcode,
    country: option.address.country,
    lat: option.lat,
    lon: option.lon,
  }));

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name="meetingLocation"
          control={control}
          render={({ field }) => (
            <>
              <Autocomplete
                value={
                  filteredOptions.find(
                    (opt) => opt.name === field.value?.name
                  ) || null
                }
                filterOptions={(x) => x}
                options={filteredOptions}
                getOptionLabel={(option) => getAddressParts(option).join(', ')}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name
                }
                loading={isLoading}
                loadingText={`Loading...`}
                noOptionsText={
                  isError
                    ? error?.message
                    : `Can't find it? Try another search term.`
                }
                onChange={(_, newValue) => {
                  if (newValue) {
                    setSelectedLocation(newValue);
                  } else {
                    setSelectedLocation(null); // Reset map when cleared
                  }
                  field.onChange(newValue || null);
                }}
                renderOption={(props, option) => {
                  const { key, ...optionProps } = props;
                  return (
                    <Box key={props.id} component="li" {...optionProps}>
                      {getAddressParts(option).join(', ')}
                    </Box>
                  );
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    size="small"
                    margin="dense"
                    label="Search address"
                    error={isError || !!errors?.meetingLocation}
                    onChange={handleChange}
                  />
                )}
                slotProps={{
                  paper: { elevation: 5 },
                }}
              />
              <ErrorText
                error={
                  error?.message ||
                  errors?.meetingLocation?.message ||
                  errors?.meetingLocation?.name?.message
                }
              />
            </>
          )}
        />
      </Grid>

      {selectedLocation && (
        <Box sx={{ height: 200, width: '100%', mt: 2 }}>
          <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
        </Box>
      )}
    </>
  );
};

export default MeetingLocation;
