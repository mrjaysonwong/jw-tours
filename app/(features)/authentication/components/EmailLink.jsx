'use client';

import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';

// local imports
import { emailSignInSchema } from '@/helpers/validation/yup/schemas/signInSchema';
import { errorHandler } from '@/helpers/errorHelpers';
import { AlertMessage } from '@/components/alerts/Alerts';
import { ErrorText } from '@/components/errors/ErrorTexts';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import Confirmation from '@/app/(features)/authentication/components/Confirmation';
import { StyledAuthContainer } from '@/components/styled/StyledContainers';
import { StyledAuthCard } from '@/components/styled/StyledCards';
import { useMessageStore } from '@/stores/messageStore';

export default function EmailLink() {
  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  let submitAttemptRef = useRef(0);

  let emailRef = useRef('');

  const [captcha, setCaptcha] = useState('' || null);
  const [message, setMessage] = useState('');

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

      if (data) {
        setMessage(data.statusText);
        emailRef.current = data.email;
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
      <a href="/">
        <Box sx={{ position: 'absolute' }}>
          <Button variant="outlined" sx={{ m: 2 }}>
            Go Back
          </Button>
        </Box>
      </a>

      <StyledAuthContainer>
        {emailRef.current ? (
          <Confirmation
            message={message}
            email={emailRef.current}
            action="signin"
          />
        ) : (
          <>
            <StyledAuthCard>
              <Box>
                <Typography variant="h5">Sign In with Email Link</Typography>

                <Divider sx={{ my: 2 }} />

                <Typography sx={{ my: 3 }}>
                  Enter the email address associated with your account and we
                  will send you a one-time sign in link.
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
              </form>
            </StyledAuthCard>
          </>
        )}
      </StyledAuthContainer>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
