import React, { useState } from 'react';
import {
  Box,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import FormInput from '@/components/inputs/FormInput';
import { addNewUserSchema } from '@/validation/yup/admin/addNewUserSchema';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import ErrorText from '@/components/errors/ErrorText';
import AlertMessage from '@/components/alerts/AlertMessage';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import { API_URLS } from '@/constants/api';

const AddUserFormFields = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(addNewUserSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.ADMIN}/create-user`;
      const { data } = await axios.post(url, formData);

      if (data) {
        reset();
        handleAlertMessage(data.statusText, 'success');
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="firstName"
              label="First Name"
              errors={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="lastName"
              label="Last Name"
              errors={errors.lastName}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              register={register}
              inputName="email"
              type="email"
              label="Email"
              errors={errors.email}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl
              fullWidth
              size="small"
              margin="dense"
              error={!!errors.role}
            >
              <InputLabel htmlFor="select-label">Role</InputLabel>

              <Controller
                name="role"
                control={control}
                defaultValue={''}
                render={({ field }) => (
                  <Select
                    {...field}
                    label="Role"
                    inputProps={{
                      id: 'select-label',
                    }}
                  >
                    <MenuItem value={'user'}>User</MenuItem>
                    <MenuItem value={'guide'}>Guide</MenuItem>
                    <MenuItem value={'partner'}>Partner</MenuItem>
                    <MenuItem value={'agent'}>Agent</MenuItem>
                  </Select>
                )}
              />
            </FormControl>

            <ErrorText error={errors.role} />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              register={register}
              inputName="password"
              type="password"
              label="Password"
              errors={errors.password}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormInput
              register={register}
              inputName="confirmPassword"
              type="password"
              label="Confirm Password"
              errors={errors.confirmPassword}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          <Box sx={{ mt: 2, ml: 'auto' }}>
            <FormSubmitButton
              label="Submit"
              action="create"
              isSubmitting={isSubmitting}
            />
          </Box>
        </Grid>
      </form>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
};

export default AddUserFormFields;
