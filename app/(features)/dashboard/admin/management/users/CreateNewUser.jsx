import React, { useState } from 'react';
import {
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Typography,
  Card,
  CardContent,
  CardActions,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import FormInput from '@/components/inputs/FormInput';
import { createUserSchema } from '@/validation/yup/admin/createUserSchema';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import ErrorText from '@/components/errors/ErrorText';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/apiRoutes';

const CreateNewUser = () => {
  const [showPassword, setShowPassword] = useState(false);

  const { handleAlertMessage } = useMessageStore();

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
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.ADMIN}/create-user`;
      const { data } = await axios.post(url, formData);

      if (data) {
        reset();
        handleAlertMessage(data.message, 'success');
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Typography variant="h5">Create a new user</Typography>

      <Card sx={{ width: { xs: 'auto', sm: '400px' }, m: 'auto' }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <CardContent>
            <Grid container columnSpacing={2}>
              <Grid item xs={12}>
                <FormInput
                  register={register}
                  inputName="firstName"
                  label="First Name"
                  errors={errors.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <FormInput
                  register={register}
                  inputName="lastName"
                  label="Last Name"
                  errors={errors.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <FormInput
                  register={register}
                  inputName="email"
                  type="email"
                  label="Email"
                  errors={errors.email}
                />
              </Grid>

              <Grid item xs={12}>
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

              <Grid item xs={12}>
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

              <Grid item xs={12}>
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
            </Grid>
          </CardContent>

          <CardActions sx={{ p: 2 }}>
            <FormSubmitButton label="Submit" isSubmitting={isSubmitting} />
          </CardActions>
        </form>
      </Card>
    </>
  );
};

export default CreateNewUser;
