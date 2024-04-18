'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  MainContainer,
  AuthCard,
} from '@/app/components/global-styles/globals';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { sigUpSchema } from '@/lib/validation/yup/signUpSchema';
import { FieldErrorMessage } from '@/app/components/custom/messages';
import axios from 'axios';
import { errorHandler } from '@/utils/errorHandler';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertMessage } from '@/app/components/custom/messages';
import { useMessageStore } from '@/stores/messageStore';

export default function SignUp() {
  const router = useRouter();

  const [hasError, setHasError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(sigUpSchema),
  });

  const onSubmit = async (formData, event) => {
    try {
      const mode = 'signup';
      const url = '/api/signup';

      const { data } = await axios.post(url, formData);

      if (data) {
        setHasError(false);

        router.replace(
          `/confirmation/send-link?email=${encodeURIComponent(
            data.email
          )}&mode=${mode}`
        );
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setHasError(true);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <MainContainer sx={{ minHeight: '90vh' }}>
      <AuthCard sx={{ width: 'clamp(300px, 90vw, 360px)' }}>
        <Typography variant="h5">Create an account</Typography>
        <form>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                {...register('firstName')}
                fullWidth
                label="First Name"
                name="firstName"
                error={!!errors.firstName}
              />
              <FieldErrorMessage error={errors.firstName} />
            </Grid>
            <Grid item xs={6}>
              <TextField
                {...register('lastName')}
                fullWidth
                label="Last Name"
                name="lastName"
                error={!!errors.lastName}
              />
              <FieldErrorMessage error={errors.lastName} />
            </Grid>

            <Grid item xs={12}>
              <TextField
                {...register('email')}
                fullWidth
                label="Email"
                name="email"
                error={!!errors.email}
              />
              <FieldErrorMessage error={errors.email} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('password')}
                fullWidth
                label="Password"
                name="password"
                error={!!errors.password}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FieldErrorMessage error={errors.password} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('confirmPassword')}
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                error={!!errors.confirmPassword}
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <FieldErrorMessage error={errors.confirmPassword} />
            </Grid>

            <Grid item xs={12}>
              <Typography variant="body2">
                By clicking Sign Up, you agree to our{' '}
                <a href="/legal/user-agreement" className="legal">
                  User Agreement
                </a>{' '}
                and acknowledge that you have read and understand our{' '}
                <a href="/legal/privacy-policy" className="legal">
                  Privacy Policy
                </a>
                .
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <FormSubmitButton
                label="Sign Up"
                mode="auth"
                handleSubmit={handleSubmit(onSubmit)}
                isSubmitting={isSubmitting}
                isSubmitSuccessful={isSubmitSuccessful}
                hasError={hasError}
                fullWidth={true}
              />
            </Grid>
          </Grid>
        </form>
      </AuthCard>

      <Box sx={{ my: 2, display: 'flex' }}>
        <Typography>Already have an account?</Typography>
        <Link href="/signin" replace>
          <Typography sx={{ ml: 1, color: 'var(--text-link-color-blue)' }}>
            Sign In
          </Typography>
        </Link>
      </Box>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </MainContainer>
  );
}
