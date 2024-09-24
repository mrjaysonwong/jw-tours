import React, { useContext } from 'react';
import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

// local imports
import { EditDetailsContext } from '@/app/(features)/account/contexts/EditDetailsProvider';

export default function Gender() {
  const { user, control } = useContext(EditDetailsContext);

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
                size="small"
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
