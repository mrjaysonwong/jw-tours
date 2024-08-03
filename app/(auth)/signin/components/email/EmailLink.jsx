'use client';

import React, { useState, useRef } from 'react';
import {
  StyledContainer as MainContainer,
  StyledCard,
} from '@/app/components/global-styles/globals';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSignInSchema } from '@/lib/validation/yup/signInSchema';
import { FieldErrorMessage } from '@/app/components/custom/messages';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';
import ReCAPTCHA from 'react-google-recaptcha';
import { AlertMessage } from '@/app/components/custom/messages';
import { useMessageStore } from '@/stores/messageStore';

export default function EmailLink() {
  const router = useRouter();

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  let submitAttemptRef = useRef(0);

  const [captcha, setCaptcha] = useState('' || null);

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
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(emailSignInSchema),
  });

  const onSubmit = async (formData, event) => {
    submitAttemptRef.current++;
    
    try {
      const action = 'signin';
      const url = `/api/send-link?action=${action}`;

      const { data } = await axios.post(url, formData);

      if (!data) {
        
      handleAlertMessage('Server Error', 'error');
      }

      if (data) {
        router.push(
          `/confirmation/send-link?email=${encodeURIComponent(
            data.email
          )}&action=${action}`
        );
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
      <MainContainer
        sx={{
          mt: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledCard sx={{ width: 'clamp(280px, 50%, 340px)' }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5">
              Sign in to JW Tours with a one-time link
            </Typography>

            <Typography color="gray">
              Enter the verified email address registered with your JW Tours
              account, and we&apos;ll send you a link to sign in.
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
              autoComplete='email'
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
                Go Back
              </Button>
            </Link>
          </form>
        </StyledCard>
      </MainContainer>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
