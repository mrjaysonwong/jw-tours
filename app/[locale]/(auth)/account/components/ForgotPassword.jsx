'use client';

import React, { useState, useRef } from 'react';
import { Link } from '@/navigation';
import { StyledCard } from '@/app/components/global-styles/globals';
import { Box, Button, TextField, Typography } from '@mui/material';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSignInSchema as emailSchema } from '@/lib/validation/yup/signInSchema';
import { FieldErrorMessage } from '@/app/components/custom/texts';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';
import ReCAPTCHA from 'react-google-recaptcha';
import { AlertMessage } from '@/app/components/custom/texts';
import { useMessageStore } from '@/stores/messageStore';

export default function ForgotPassword() {
  let submitAttemptRef = useRef(0);

  const [confirmation, setConfirmation] = useState(false);

  const [captcha, setCaptcha] = useState('' || null);

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const onChange = () => {
    setCaptcha(false);
    submitAttemptRef.current = 0;
    document
      .querySelectorAll(`iframe[src*=recaptcha]`)
      .forEach((a) => a.remove());
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = async (formData, event) => {
    submitAttemptRef.current++;

    try {
      const action = 'reset-password';
      const url = `/api/account/security?action=${action}`;

      const { data } = await axios.post(url, formData);

      if (data) {
        reset();
        setConfirmation(true);
        handleAlertMessage(data.statusText, 'success');
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      if (submitAttemptRef.current === 5 && errorMessage) {
        setCaptcha(true);
      }

      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <StyledCard sx={{ width: 'clamp(300px, 50%, 300px)' }}>
        {confirmation ? (
          <>
            <Typography variant="h6">Check your inbox</Typography>

            <Typography
              sx={{ my: 2, span: { color: '#0288d1', cursor: 'pointer' } }}
            >
              We have emailed you instructions for creating a new password. If
              you have not received an email from us, you can{' '}
              <span onClick={() => location.reload()}>request a new one</span>.
            </Typography>
          </>
        ) : (
          <>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">Forgot Password</Typography>

              <Typography color="gray">
                Enter your email address below to reset your password.
              </Typography>
            </Box>
            <form>
              <TextField
                {...register('email')}
                fullWidth
                size="small"
                autoFocus
                margin="dense"
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                error={!!errors.email}
              />

              <FieldErrorMessage error={errors.email} />

              {captcha && (
                <ReCAPTCHA
                  sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
                  onChange={onChange}
                  className="recaptcha"
                />
              )}

              <FormSubmitButton
                label="Send"
                action="auth"
                handleSubmit={handleSubmit(onSubmit)}
                isSubmitting={isSubmitting}
                isSubmitSuccessful={isSubmitSuccessful}
                fullWidth={true}
                captcha={captcha}
              />

              <Link href="/signin">
                <Button
                  fullWidth
                  disabled={isSubmitting}
                  variant="text"
                  sx={{ mt: 2 }}
                >
                  Go back
                </Button>
              </Link>
            </form>
          </>
        )}
      </StyledCard>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
