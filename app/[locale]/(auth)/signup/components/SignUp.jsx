'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import {
  Box,
  Typography,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';
import {
  StyledContainer as MainContainer,
  StyledCard,
} from '@/app/components/global-styles/globals';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { signUpSchema } from '@/lib/validation/yup/signUpSchema';
import { FieldErrorMessage } from '@/app/components/custom/texts';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertMessage } from '@/app/components/custom/texts';
import { useMessageStore } from '@/stores/messageStore';
import Confirmation from '@/app/components/confirmation/Confirmation';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);

  let emailRef = useRef('');

  const t = useTranslations('SignInPage');

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (formData, event) => {
    try {
      const url = '/api/signup';

      const { data } = await axios.post(url, formData);

      if (data) {
        emailRef.current = data.email;
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <MainContainer
      sx={{
        mt: emailRef.current ? 0 : 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {emailRef.current ? (
        <Confirmation email={emailRef.current} action={'signup'} />
      ) : (
        <>
          <StyledCard
            sx={{
              width: 'clamp(300px, 90vw, 350px)',
              height: { lg: '460px' },
              overflowY: { lg: 'auto' },
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              {t('header')}
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    {...register('firstName')}
                    fullWidth
                    size="small"
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
                    size="small"
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
                    size="small"
                    label="Email"
                    name="email"
                    error={!!errors.email}
                    autoComplete="email"
                  />
                  <FieldErrorMessage error={errors.email} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register('password')}
                    fullWidth
                    size="small"
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
                    size="small"
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
                    <a href="/legal/user-agreement">User Agreement</a> and
                    acknowledge that you have read and understand our{' '}
                    <a href="/legal/privacy-policy">Privacy Policy</a>.
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormSubmitButton
                    label="Sign Up"
                    action="auth"
                    handleSubmit={handleSubmit(onSubmit)}
                    isSubmitting={isSubmitting}
                    isSubmitSuccessful={isSubmitSuccessful}
                    fullWidth={true}
                  />
                </Grid>
              </Grid>
            </form>
          </StyledCard>

          <Box
            sx={{
              my: 2,
              display: 'flex',
              a: {
                pointerEvents: isSubmitting ? 'none' : 'auto',
              },
            }}
          >
            <Typography>Already have an account?</Typography>
            <Link href="/signin">
              <Typography sx={{ ml: 1, color: 'var(--text-link-color-blue)' }}>
                Sign In
              </Typography>
            </Link>
          </Box>
        </>
      )}

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </MainContainer>
  );
}
