'use client';

// third-party imports
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import ReCAPTCHA from 'react-google-recaptcha';
import { Box, Typography, Divider, Card, CardContent } from '@mui/material';

// internal imports
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useMessageStore } from '@/stores/messageStore';
import EmailAuthConfirmationMessage from '@/app/(features)/authentication/EmailAuthConfirmationMessage';
import HistoryBackButton from '@/components/buttons/HistoryBackButton';
import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import { errorHandler } from '@/helpers/errorHelpers';
import { getUrl, getTitle, getMessage } from '@/helpers/authActionHelpers';
import FormInput from '@/components/inputs/FormInput';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';

const EmailAuthForm = ({ action }) => {
  let submitAttemptRef = useRef(0);

  const [isConfirmation, setIsConfirmation] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const { handleAlertMessage } = useMessageStore();

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
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const onSubmit = async (formData) => {
    submitAttemptRef.current++;

    try {
      const url = getUrl({ action });
      const payload = { email: formData.email };

      const { data } = await axios.post(url, payload);

      if (data) {
        reset();
        setIsConfirmation(true);
        handleAlertMessage(data.message, 'success');
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
      <AnimateGradient />

      {isConfirmation ? (
        <EmailAuthConfirmationMessage
          action={action}
          setIsConfirmation={setIsConfirmation}
        />
      ) : (
        <Card>
          <CardContent>
            <Box>
              <Typography variant="h5">{getTitle(action)}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography>
                Enter the email address associated with your account and we will
                send you a {getMessage(action)}.
              </Typography>
            </Box>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box sx={{ my: 2 }}>
                <FormInput
                  register={register}
                  inputName="email"
                  type="email"
                  label="Email"
                  errors={errors.email}
                />
              </Box>

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
                isSubmitting={isSubmitting}
                fullWidth={true}
                captcha={captcha}
              />
            </form>

            <Box sx={{ mt: 2 }}>
              <HistoryBackButton
                fullWidth
                variant="outlined"
                isSubmitting={isSubmitting}
              />
            </Box>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default EmailAuthForm;
