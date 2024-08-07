import React, { useContext } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DetailsEditFormContext } from './DetailsEditForm';

export default function Gender() {
  const { user, control } = useContext(DetailsEditFormContext);

  return (
    <>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth>
          <InputLabel htmlFor="gender-select">Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue={user?.gender ?? ''}
            render={({ field }) => (
              <Select
                {...field}
                label="Gender"
                inputProps={{
                  id: 'gender-select',
                }}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
    </>
  );
}
