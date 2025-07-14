import React, { useEffect, useRef, useState } from 'react';
import { TextField, Autocomplete, Box } from '@mui/material';
import { useDebounce } from 'use-debounce';
import 'leaflet/dist/leaflet.css';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

// internal imports
import { usePlacesData } from '@/hooks/usePlacesData';
import { getAddressParts } from '@/utils/common';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_ID } from '@/constants/env';
import { getDistanceInKm } from '@/utils/common';
import { usePickupLocationStore } from '@/stores/checkoutStore';
import { useCheckoutContext } from '@/contexts/CheckoutProvider';

const Pickup = ({ setError }) => {
  const { tour } = useCheckoutContext();
  const { lat, lon } = tour.meetingLocation;

  const mapRef = useRef(null);
  const [L, setL] = useState(null);

  const { searchTerm, setSearchTerm, selectedLocation, setSelectedLocation } =
    usePickupLocationStore();

  const [debouncedText] = useDebounce(searchTerm, 700);

  const {
    data: suggestions = [],
    isLoading,
    isError,
    error,
  } = usePlacesData(debouncedText);

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
      zoom: 14.5,
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
        `<div style="text-transform: capitalize">
          ${getAddressParts(selectedLocation).join(', ')}
        </div>`
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
      country: option.address.country,
      lat: option.lat,
      lon: option.lon,
    }))
    .filter(
      (option) => getDistanceInKm(+lat, +lon, +option.lat, +option.lon) <= 5
    );

  return (
    <>
      <Autocomplete
        value={
          filteredOptions.find(
            (opt) =>
              opt.name === selectedLocation?.name &&
              opt.suburb === selectedLocation?.suburb
          ) ||
          selectedLocation ||
          null
        }
        filterOptions={(x) => x}
        options={filteredOptions}
        getOptionLabel={(option) => getAddressParts(option).join(', ')}
        isOptionEqualToValue={(option, value) =>
          option.name === value.name && option.suburb === value.suburb
        }
        loading={isLoading}
        loadingText="Loading..."
        noOptionsText={
          isError
            ? error?.message
            : "Can't find it? Try another specific pickup location (Ex. location name + street or city) within 5 km from meeting point"
        }
        onChange={(_, newValue) => {
          setSelectedLocation(newValue || null);
          setError(false);
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
            placeholder="Search location"
            error={isError}
            onChange={handleChange}
          />
        )}
      />

      {selectedLocation && (
        <Box sx={{ height: 200, width: '100%', mt: 2 }}>
          <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
        </Box>
      )}
    </>
  );
};

export default Pickup;
