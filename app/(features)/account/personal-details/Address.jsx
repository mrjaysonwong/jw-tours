// third-party imports
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Autocomplete,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

// internal imports
import { useEditUserDetailsContext } from '@/contexts/EditUserDetailsProvider';
import ErrorText from '@/components/errors/ErrorText';
import { usePlacesData } from '@/hooks/usePlacesData';
import { getAddressParts } from '@/utils/common';

const Address = () => {
  const { control } = useEditUserDetailsContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 700);

  const {
    data: suggestions = [],
    isLoading,
    isError,
    error,
  } = usePlacesData(debouncedText);

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
  }));

  return (
    <>
      <Grid item xs={12}>
        <Divider textAlign="left" sx={{ mt: 1 }}>
          <Typography variant="body2" color="darkgray">
            Address
          </Typography>
        </Divider>
      </Grid>

      <Grid item xs={12}>
        <Controller
          name="address"
          control={control}
          render={({ field }) => {
            return (
              <>
                <Autocomplete
                  value={
                    filteredOptions.find(
                      (opt) => opt.name === field.value?.name
                    ) || null
                  }
                  filterOptions={(x) => x}
                  options={filteredOptions}
                  getOptionLabel={(option) =>
                    getAddressParts(option).join(', ')
                  }
                  isOptionEqualToValue={(option, value) => {
                    return option.name === value.name;
                  }}
                  loading={isLoading}
                  loadingText={`Loading...`}
                  noOptionsText={
                    isError
                      ? error?.message
                      : `Can't find it? Try another search term.`
                  }
                  onChange={(_, newValue) => {
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
                    <>
                      <TextField
                        {...params}
                        size="small"
                        margin="dense"
                        label="Search address"
                        value={searchTerm}
                        error={isError}
                        onChange={handleChange}
                      />
                    </>
                  )}
                  slotProps={{
                    paper: {
                      elevation: 5,
                    },
                  }}
                />
                <ErrorText error={error?.message} />
              </>
            );
          }}
        />
      </Grid>
    </>
  );
};

export default Address;
