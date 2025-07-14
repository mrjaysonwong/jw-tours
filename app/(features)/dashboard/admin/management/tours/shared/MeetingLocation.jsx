import React, { useEffect, useRef, useState } from 'react';
import { Controller, useWatch } from 'react-hook-form';
import { Grid, TextField, Autocomplete, Box } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import { useDebounce } from 'use-debounce';
import 'leaflet/dist/leaflet.css';

// internal imports
import { useTourFormContext } from './CardForm';
import ErrorText from '@/components/errors/ErrorText';
import { usePlacesData } from '@/hooks/usePlacesData';
import { getAddressParts } from '@/utils/common';
import { capitalizeText } from '@/utils/formats/common';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '@/constants/env';
import { getDistanceInKm } from '@/utils/common';

const MeetingLocation = () => {
  const { control, errors, watch, tour } = useTourFormContext();
  const meetingLocationValue = watch('meetingLocation');

  const lat = useWatch({ control, name: 'destination.lat' });
  const lon = useWatch({ control, name: 'destination.lon' });

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
    if (!meetingLocationValue) {
      setSelectedLocation(null);
      setSearchTerm('');
    }
  }, [meetingLocationValue]);

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

  const filteredOptions = suggestions
    .filter((option) => option.address.country === 'Philippines')
    .map((option) => ({
      name: option.address.name,
      road: option.address.road,
      suburb: option.address.suburb,
      city: option.address.city,
      state: option.address.state,
      postcode: option.address.postcode,
      country: option.address.country,
      lat: option.lat,
      lon: option.lon,
    }))
    .filter(
      (option) => getDistanceInKm(+lat, +lon, +option.lat, +option.lon) <= 300
    );

  const getValue = tour?.meetingLocation
    ? {
        name: capitalizeText(tour.meetingLocation.name),
        ...(tour.meetingLocation.road && {
          road: capitalizeText(tour.meetingLocation.road),
        }),
        ...(tour.meetingLocation.suburb && {
          suburb: capitalizeText(tour.meetingLocation.suburb),
        }),
        ...(tour.meetingLocation.state && {
          state: capitalizeText(tour.meetingLocation.state),
        }),
        ...(tour.meetingLocation.city && {
          city: capitalizeText(tour.meetingLocation.city),
        }),
        country: capitalizeText(tour.meetingLocation.country),
        ...(tour.meetingLocation.postcode && {
          postcode: tour.meetingLocation.postcode,
        }),
        lat: tour.meetingLocation.lat,
        lon: tour.meetingLocation.lon,
      }
    : null;

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name="meetingLocation"
          defaultValue={getValue}
          control={control}
          render={({ field }) => (
            <>
              <Autocomplete
                value={
                  filteredOptions.find(
                    (opt) => opt.name === field.value?.name
                  ) ||
                  field.value ||
                  null
                }
                filterOptions={(x) => x}
                options={filteredOptions}
                getOptionLabel={(option) => getAddressParts(option).join(', ')}
                isOptionEqualToValue={(option, value) =>
                  option.name === value.name && option.suburb === value.suburb
                }
                loading={isLoading}
                loadingText={`Loading...`}
                noOptionsText={
                  isError
                    ? error?.message
                    : `Can't find it? Try another search term (within 300 km) from destination.`
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
                    <Box
                      key={props.id}
                      component="li"
                      {...optionProps}
                      sx={{ display: 'flex', gap: 1.5 }}
                    >
                      <Box sx={{ mb: 'auto' }}>
                        <PlaceOutlinedIcon />
                      </Box>

                      <Box>
                        <Box sx={{ display: 'flex', fontWeight: 500 }}>
                          {getAddressParts(option, ['name']).join(' - ')}
                        </Box>

                        <Box color="text.secondary">
                          {getAddressParts(option, [
                            'road',
                            'suburb',
                            'city',
                            'state',
                            'country',
                          ]).join(', ')}
                        </Box>
                      </Box>
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
                    inputRef={field.ref}
                    name={field.name}
                  />
                )}
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
