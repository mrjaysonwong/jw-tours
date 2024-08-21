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
import { signUpTranslations } from '@/lib/validation/validationTranslations';

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');

  let emailRef = useRef('');

  const t = useTranslations('signup_page');
  const t1 = useTranslations('common');

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const translations = signUpTranslations(t, t1);
  const schema = signUpSchema(translations);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
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
      const { errorMessage } = errorHandler(error, t1);

      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <MainContainer sx={{ alignItems: 'center' }}>
      {emailRef.current ? (
        <Confirmation
          message={message}
          email={emailRef.current}
          action={'signup'}
        />
      ) : (
        <>
          <StyledCard
            sx={{
              width: 'clamp(300px, 50%, 300px)',
            }}
          >
            <Typography variant="h5" sx={{ mb: 2 }}>
              {t('headers.signup')}
            </Typography>
            <form>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField
                    {...register('firstName')}
                    fullWidth
                    size="small"
                    label={t1('labels.fname')}
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
                    label={t1('labels.lname')}
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
                    label={t1('labels.email')}
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
                  <FieldErrorMessage error={errors.password} />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    {...register('confirmPassword')}
                    fullWidth
                    size="small"
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
                  <FieldErrorMessage error={errors.confirmPassword} />
                </Grid>

                <Grid item xs={12}>
                  <Typography variant="body2">
                    {t('paragraphs.by_clicking')}
                    <br />
                    <a href="/legal/user-agreement">
                      {t('paragraphs.user_agreement')}
                    </a>{' '}
                    {t('paragraphs.and_acknowledge')}{' '}
                    <a href="/legal/privacy-policy">
                      {t('paragraphs.privacy_policy')}
                    </a>
                    .
                  </Typography>
                </Grid>

                <Grid item xs={12}>
                  <FormSubmitButton
                    label={t('button_labels.signup')}
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
                ml: 1,
                pointerEvents: isSubmitting ? 'none' : 'auto',
              },
            }}
          >
            <Typography>{t('paragraphs.already_have_account')}</Typography>
            <Link href="/signin">
              <Typography sx={{ color: 'var(--text-link-color-blue)' }}>
                {t('paragraphs.signin')}
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
