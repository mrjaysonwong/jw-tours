// third-party imports
import React, { useState, useEffect } from 'react';
import { Grid, TextField, Autocomplete, Box } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import AutoCompleteInput from '@/components/inputs/AutoCompleteInput';
import { geoLocations } from '@/validation/yup/admin/createTourSchema';
import { categories } from '@/models/tourModel';
import { usePlacesData } from '@/hooks/usePlacesData';
import ErrorText from '@/components/errors/ErrorText';
import { getAddressParts } from '@/utils/common';

const Destination = () => {
  const { control, errors, setValue, watch } = useCreateTourContext();
  const destinationName = watch('destination.name');

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 700);

  const {
    data: suggestions = [],
    isLoading,
    isError,
    error,
  } = usePlacesData(debouncedText);

  useEffect(() => {
    if (!destinationName) {
      setSearchTerm('');
    }
  }, [destinationName]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredOptions = suggestions
    .map((option) => ({
      name: option.address.name,
      neighbourhood: option.address.neighbourhood,
      city: option.address.city,
      state: option.address.state,
      postcode: option.address.postcode,
      country: option.address.country,
    }))
    .filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.name === option.name)
    );

  return (
    <>
      <Grid container columnSpacing={2} rowSpacing={0}>
        <Grid item xs={12}>
          <Controller
            name="destination.name"
            control={control}
            render={({ field }) => {
              return (
                <>
                  <Autocomplete
                    value={
                      filteredOptions.find((opt) => opt.name === field.value) ||
                      null
                    }
                    filterOptions={(x) => x}
                    options={filteredOptions}
                    getOptionLabel={(option) => option.name || ''}
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
                      field.onChange(newValue ? newValue.name : '');
                      setValue(
                        'destination.city',
                        newValue ? newValue.city : ''
                      );
                      setValue(
                        'destination.country',
                        newValue ? newValue.country : ''
                      );
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
                        error={isError || !!errors?.destination}
                        onChange={handleChange}
                      />
                    )}
                    slotProps={{
                      paper: { elevation: 5 },
                    }}
                  />
                  <ErrorText
                    error={error?.message || errors?.destination?.name?.message}
                  />
                </>
              );
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <AutoCompleteInput
            inputName="destination.geoLocation"
            label="Geographic location"
            id="geographic-location-select"
            control={control}
            options={geoLocations}
            error={errors?.destination?.geoLocation}
          />
        </Grid>

        <Grid item xs={12}>
          <AutoCompleteInput
            inputName="destination.category"
            placeholder="Category"
            id="category-select"
            control={control}
            multiple={true}
            options={categories.sort()}
            error={errors?.destination?.category}
            setValue={setValue}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default Destination;
