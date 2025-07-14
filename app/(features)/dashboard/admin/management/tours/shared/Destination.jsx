// third-party imports
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

// internal imports
import { useTourFormContext } from './CardForm';
import AutoCompleteInput from '@/components/inputs/AutoCompleteInput';
import { geoLocations } from '@/validation/yup/tour/tourSchema';
import { categories } from '@/models/tourModel';
import { usePlacesData } from '@/hooks/usePlacesData';
import ErrorText from '@/components/errors/ErrorText';
import { getAddressParts } from '@/utils/common';
import { capitalizeText } from '@/utils/formats/common';

const Destination = () => {
  const { control, errors, setValue, watch, tour } = useTourFormContext();

  const destinationValue = watch('destination');

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 700);

  const {
    data: suggestions = [],
    isLoading,
    isError,
    error,
  } = usePlacesData(debouncedText);

  useEffect(() => {
    if (!destinationValue) {
      setSearchTerm('');
    }
  }, [destinationValue]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = suggestions
    .filter((option) => option.address.country === 'Philippines')
    .map((option) => ({
      name: option.address.name,
      city: option.address.city,
      country: option.address.country,
      lat: option.lat,
      lon: option.lon,
    }))
    .filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.name === option.name)
    );

  const getValue = tour?.destination
    ? {
        name: capitalizeText(tour.destination.name),
        ...(tour.destination.city && {
          city: capitalizeText(tour.destination.city),
        }),
        country: capitalizeText(tour.destination.country),
        lat: tour.destination.lat,
        lon: tour.destination.lon,
      }
    : null;

  return (
    <>
      <Grid container columnSpacing={2} rowSpacing={0}>
        <Grid item xs={12}>
          <Controller
            name="destination"
            defaultValue={getValue}
            control={control}
            render={({ field }) => {
              return (
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
                    getOptionLabel={(option) =>
                      getAddressParts(option).join(', ')
                    }
                    isOptionEqualToValue={(option, value) =>
                      option.name === value.name
                    }
                    loading={isLoading}
                    loadingText="Loading..."
                    noOptionsText={
                      isError
                        ? error?.message
                        : `Can't find it? Try another search term.`
                    }
                    onChange={(_, newValue) => {
                      field.onChange(newValue);
                    }}
                    renderOption={(props, option) => {
                      const { key, ...optionProps } = props;

                      return (
                        <Box key={props.id} component="li" {...optionProps}>
                          {getAddressParts(option, [
                            'name',
                            'city',
                            'country',
                          ]).join(', ')}
                        </Box>
                      );
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        size="small"
                        margin="dense"
                        placeholder="Ex: El Nido"
                        inputRef={field.ref}
                        name={field.name}
                        error={isError || !!errors?.destination}
                        onChange={handleChange}
                        inputProps={{
                          ...params.inputProps,
                          value: field.value
                            ? getAddressParts(field.value, [
                                'name',
                                'country',
                              ]).join(', ')
                            : params.inputProps.value,
                        }}
                      />
                    )}
                  />
                  <ErrorText
                    error={error?.message || errors?.destination?.message}
                  />
                </>
              );
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <AutoCompleteInput
            inputName="geoLocation"
            defaultValue={tour && capitalizeText(tour.geoLocation)}
            label="Geographic location"
            id="geographic-location-select"
            control={control}
            options={geoLocations}
            error={errors?.geoLocation}
          />
        </Grid>

        <Grid item xs={12}>
          <AutoCompleteInput
            inputName="category"
            defaultValue={tour?.category}
            placeholder="Category"
            id="category-select"
            control={control}
            multiple={true}
            options={categories.sort()}
            error={errors?.category}
            setValue={setValue}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Destination;
