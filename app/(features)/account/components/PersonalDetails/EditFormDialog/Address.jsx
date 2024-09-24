import React, { useContext, useEffect, useState } from 'react';
import {
  Grid,
  TextField,
  Autocomplete,
  Divider,
  Typography,
} from '@mui/material';
import { Controller } from 'react-hook-form';
import { useDebounce } from 'use-debounce';
import axios from 'axios';

// local imports
import { EditDetailsContext } from '@/app/(features)/account/contexts/EditDetailsProvider';
import { ErrorText } from '@/components/errors/ErrorTexts';

export default function Address() {
  const { user, register, control } = useContext(EditDetailsContext);
  const address = user?.address;

  const street = address?.street;
  const homeTown = address?.homeTown;
  const postalCode = address?.postalCode;

  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedText] = useDebounce(text, 1500);

  const [error, setError] = useState({
    show: false,
    message: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const fetchSearch = async () => {
    try {
      // Return if suggestions value result is empty to avoid error
      if (!debouncedText) {
        return;
      }

      setLoading(true);

      // Create api for search places
      const url = '/api/places';

      const options = {
        method: 'GET',
        params: {
          namePrefix: `${debouncedText}`,
        },
      };

      const { data } = await axios.get(url, options);

      setSuggestions(data);
      setError({ show: false });
      setLoading(false);
    } catch (error) {
      setError({ show: true, message: 'Failed to fetch location. Try again.' });
    }
  };

  useEffect(() => {
    fetchSearch();
  }, [debouncedText]);

  return (
    <>
      <Grid item xs={12}>
        <Divider textAlign="left">
          <Typography variant="body2" color="darkgray">
            Address
          </Typography>
        </Divider>
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register('address.street')}
          fullWidth
          size="small"
          label="Street"
          name="address.street"
          defaultValue={street}
          inputProps={{ maxLength: 100 }}
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
                loading={loading && !error.show}
                loadingText={`Loading...`}
                noOptionsText={
                  error.show
                    ? 'Failed to fetch location. Try again.'
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
                      label="City, Region/State, Country"
                      value={text}
                      error={error.show}
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
                    elevation: 2,
                  },
                }}
              />
              <ErrorText error={error.message} />
            </>
          )}
        />
      </Grid>

      <Grid item xs={12} md={3}>
        <TextField
          {...register('address.postalCode')}
          fullWidth
          size="small"
          label="Postal Code"
          name="address.postalCode"
          defaultValue={postalCode}
          inputProps={{ maxLength: 10 }}
        />
      </Grid>
    </>
  );
}
