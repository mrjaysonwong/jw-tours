// third-party imports
import React, { useState } from 'react';
import {
  Grid,
  TextField,
  Autocomplete,
  Divider,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';

// internal imports
import { useEditUserDetailsContext } from '@/app/(features)/account/contexts/EditUserDetailsProvider';
import FormInput from '@/components/inputs/FormInput';
import ErrorText from '@/components/errors/ErrorText';
import { usePlacesData } from '@/hooks/usePlacesData';

const Address = () => {
  const { user, register, control, errors } = useEditUserDetailsContext();
  const address = user?.address;

  const street = address?.street;
  const homeTown = address?.homeTown;
  const postalCode = address?.postalCode;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedText] = useDebounce(searchTerm, 1500);

  const {
    data: suggestions = [],
    isLoading,
    isError,
    error,
  } = usePlacesData(debouncedText);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <Grid item xs={12}>
        <Divider textAlign="left" sx={{ my: 1 }}>
          <Typography variant="body2" color="darkgray">
            Address
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <FormInput
          register={register}
          inputName="address.street"
          label="Street"
          defaultValue={street}
          errors={errors?.address?.street}
        />
      </Grid>

      <Grid item xs={12} md={9}>
        <Controller
          name="address.homeTown"
          control={control}
          defaultValue={homeTown}
          render={({ field: { name, value, onChange } }) => (
            <>
              <Autocomplete
                name={name}
                value={value}
                loading={isLoading}
                loadingText={`Loading...`}
                noOptionsText={
                  isError
                    ? error?.message
                    : `Can't find it? Be specific in searching by City.`
                }
                options={suggestions.map(
                  (option, idx) =>
                    `${idx + 1}. ${option.name}, ${
                      option.region ? option.region : ''
                    }, ${option.country}`
                )}
                onChange={(e, newValue, reason) => {
                  if (reason === 'clear') {
                    onChange('');
                  } else if (newValue) {
                    const modifiedValue = newValue.replace(/^\d+\.\s/, '');
                    onChange(modifiedValue);
                  }
                }}
                isOptionEqualToValue={(option, value) => {
                  return option.name === value.name;
                }}
                renderInput={(params) => (
                  <>
                    <TextField
                      {...params}
                      name={name}
                      size="small"
                      margin="dense"
                      label="City, Region/State, Country"
                      value={searchTerm}
                      error={isError}
                      onChange={handleChange}
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: 'disable',
                      }}
                    />
                  </>
                )}
                slotProps={{
                  paper: {
                    elevation: 3,
                  },
                }}
              />
              <ErrorText error={error?.message} />
            </>
          )}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <FormInput
          register={register}
          inputName="address.postalCode"
          label="Postal Code"
          defaultValue={postalCode}
          errors={errors?.address?.postalCode}
        />
      </Grid>
    </>
  );
};

export default Address;
