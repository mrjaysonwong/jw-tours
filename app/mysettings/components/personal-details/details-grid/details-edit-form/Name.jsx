import React, { useContext } from 'react';
import { Grid, TextField } from '@mui/material';
import { DetailsEditFormContext } from './DetailsEditForm';
import { ErrorText } from '@/utils/helper/form-text/ErrorText';

export default function Name() {
  const { user, register, errors } = useContext(DetailsEditFormContext);

  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          // destructure and spread all events like onChange, onBlur from register function
          {...register('firstName')}
          fullWidth
          label="First Name"
          name="firstName"
          defaultValue={user?.firstName}
          error={!!errors.firstName}
        />

        {errors.firstName && <ErrorText error={errors.firstName} />}
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          {...register('lastName')}
          fullWidth
          label="Last Name"
          name="lastName"
          defaultValue={user?.lastName}
          error={!!errors.lastName}
        />

        {errors.lastName && <ErrorText error={errors.lastName} />}
      </Grid>
    </>
  );
}
