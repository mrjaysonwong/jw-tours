import React, { useContext } from 'react';
import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { DetailsEditFormContext } from '.';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

export default function DateOfBirth() {
  const { user, control } = useContext(DetailsEditFormContext);
  const dateObject = user?.dateOfBirth;
  return (
    <>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue={dateObject ? dayjs(dateObject) : null}
            render={({ field }) => {
              return (
                <DatePicker
                  {...field}
                  label="Date of Birth"
                  disableFuture
                  sx={{ width: '100%' }}
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
}
