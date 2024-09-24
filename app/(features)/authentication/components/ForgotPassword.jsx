'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box, Button, TextField, Typography, Divider } from '@mui/material';

// local imports
import { StyledAuthCard } from '@/components/styled/StyledCards';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { emailSignInSchema as emailSchema } from '@/helpers/validation/yup/schemas/signInSchema';
import { AlertMessage } from '@/components/alerts/Alerts';
import { ErrorText } from '@/components/errors/ErrorTexts';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import Confirmation from '@/app/(features)/authentication/components/Confirmation';

export default function ForgotPassword() {
  let submitAttemptRef = useRef(0);

  const [confirmation, setConfirmation] = useState(false);

  const [captcha, setCaptcha] = useState('' || null);

  const router = useRouter();

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
      const action = 'forgot-password';
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
      {confirmation ? (
        <Confirmation action="send-reset-link" />
      ) : (
        <StyledAuthCard>
          <>
            <Box>
              <Typography variant="h5">Forgot Password</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography sx={{ my: 3 }}>
                Enter the email address associated with your account and we will
                send you a link to reset your password.
              </Typography>
            </Box>
            <form>
              <TextField
                {...register('email')}
                fullWidth
                autoFocus
                margin="dense"
                size="small"
                id="email"
                name="email"
                label="Email"
                type="email"
                autoComplete="email"
                error={!!errors.email}
              />

              <ErrorText error={errors.email} />

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

              <Button
                fullWidth
                disabled={isSubmitting}
                variant="text"
                onClick={() => router.back()}
                sx={{ mt: 2 }}
              >
                Go back
              </Button>
            </form>
          </>
        </StyledAuthCard>
      )}

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
      />
    </>
  );
}
