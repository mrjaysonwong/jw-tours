import React, { useContext } from 'react';
import { Grid, TextField, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DetailsEditFormContext } from '.';
import { nationalities } from '@/src/countries/nationalities';

export default function Nationality() {
  const { user, control } = useContext(DetailsEditFormContext);

  return (
    <>
      <Grid item xs={12}>
        <Controller
          name="nationality"
          control={control}
          defaultValue={user?.nationality || null}
          render={({ field: { name, value, onChange } }) => (
            <Autocomplete
              name={name}
              value={value}
              onChange={(e, newValue) => {
                onChange(newValue);
              }}
              noOptionsText="Nationality Not Found"
              options={nationalities.map((option) => `${option.label}`)}
              renderInput={(params) => (
                <TextField {...params} autoComplete="off" label="Nationality" />
              )}
              slotProps={{
                paper: {
                  elevation: 5,
                },
              }}
            />
          )}
        />
      </Grid>
    </>
  );
}
