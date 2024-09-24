'use client';

import React, { useState, useRef, useContext } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  InputAdornment,
  IconButton,
} from '@mui/material';

// local imports
import { DialogContext } from '@/components/layout/header/Navbar';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { signUpSchema } from '@/helpers/validation/yup/schemas/signUpSchema';
import { AlertMessage } from '@/components/alerts/Alerts';
import { ErrorText } from '@/components/errors/ErrorTexts';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import Confirmation from '@/app/(features)/authentication/components/Confirmation';

export default function SignUpForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  const { setOpen } = useContext(DialogContext);

  const emailRef = useRef('');

  const t = useTranslations('signup_page');
  const t1 = useTranslations('common');

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (formData, event) => {
    try {
      const url = '/api/signup';

      const { data } = await axios.post(url, formData);

      if (data) {
        setMessage(data.statusText);
        emailRef.current = data.email;
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      {emailRef.current ? (
        <Confirmation
          message={message}
          email={emailRef.current}
          action={'signup'}
        />
      ) : (
        <>
          <form>
            <Grid container spacing={1}>
              <Grid item xs={6}>
                <TextField
                  {...register('firstName')}
                  fullWidth
                  size="small"
                  margin="dense"
                  label={t1('labels.fname')}
                  name="firstName"
                  error={!!errors.firstName}
                />
                <ErrorText error={errors.firstName} />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  {...register('lastName')}
                  fullWidth
                  size="small"
                  margin="dense"
                  label={t1('labels.lname')}
                  name="lastName"
                  error={!!errors.lastName}
                />
                <ErrorText error={errors.lastName} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('email')}
                  fullWidth
                  size="small"
                  margin="dense"
                  label={t1('labels.email')}
                  name="email"
                  error={!!errors.email}
                  autoComplete="email"
                />
                <ErrorText error={errors.email} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('password')}
                  fullWidth
                  size="small"
                  margin="dense"
                  label={t1('labels.password')}
                  name="password"
                  error={!!errors.password}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorText error={errors.password} />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  {...register('confirmPassword')}
                  fullWidth
                  size="small"
                  margin="dense"
                  label={t1('labels.confirm_pw')}
                  name="confirmPassword"
                  error={!!errors.confirmPassword}
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleShowPassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <ErrorText error={errors.confirmPassword} />
              </Grid>

              <Grid item xs={12}>
                <FormSubmitButton
                  label={t('button_labels.signup')}
                  action="auth"
                  handleSubmit={handleSubmit(onSubmit)}
                  isSubmitting={isSubmitting}
                  fullWidth={true}
                />

                <Button
                  fullWidth
                  variant="outlined"
                  disabled={isSubmitting}
                  onClick={() => setOpen(false)}
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 2, textAlign: 'left' }}>
                  <Typography variant="body2">
                    By creating an account, you agree to our{' '}
                    <span>
                      <a href="/legal/user-agreement" target="_blank">
                        User Agreement
                      </a>
                    </span>
                    . See our{' '}
                    <span>
                      <a href="/legal/privacy-policy" target="_blank">
                        Privacy Policy
                      </a>
                    </span>
                    .
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </form>
        </>
      )}

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
