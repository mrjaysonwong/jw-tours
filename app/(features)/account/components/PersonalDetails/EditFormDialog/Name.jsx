import React, { useContext } from 'react';
import { Grid, TextField } from '@mui/material';

// local imports
import { EditDetailsContext } from '@/app/(features)/account/contexts/EditDetailsProvider';
import { ErrorText } from '@/components/errors/ErrorTexts';

export default function Name() {
  const { user, register, errors } = useContext(EditDetailsContext);

  return (
    <>
      <Grid item xs={12} md={6}>
        <TextField
          // destructure and spread all events like onChange, onBlur from register function
          {...register('firstName')}
          fullWidth
          size="small"
          label="First Name"
          name="firstName"
          defaultValue={user?.firstName}
          error={!!errors.firstName}
        />

        <ErrorText error={errors.firstName} />
      </Grid>

      <Grid item xs={12} md={6}>
        <TextField
          {...register('lastName')}
          fullWidth
          size="small"
          label="Last Name"
          name="lastName"
          defaultValue={user?.lastName}
          error={!!errors.lastName}
        />

        <ErrorText error={errors.lastName} />
      </Grid>
    </>
  );
}
