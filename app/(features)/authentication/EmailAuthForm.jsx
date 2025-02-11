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
import AlertMessage from '@/components/alerts/AlertMessage';
import { useMessageStore } from '@/stores/messageStore';
import EmailAuthConfirmation from '@/app/(features)/authentication/EmailAuthConfirmation';
import HistoryBackButton from '@/components/buttons/HistoryBackButton';
import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import { errorHandler } from '@/helpers/errorHelpers';
import {
  generateUrl,
  generateTitle,
  generateMessage,
} from '@/utils/contentMap';
import FormInput from '@/components/inputs/FormInput';
import AnimateGradient from '@/components/bg-gradients/AnimatedGradient';

const EmailAuthForm = ({ actionType }) => {
  let submitAttemptRef = useRef(0);

  const [isConfirmation, setIsConfirmation] = useState(false);
  const [captcha, setCaptcha] = useState(null);
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
      const url = generateUrl(actionType);
      const requestData = { email: formData.email };

      const { data } = await axios.post(url, requestData);

      if (data) {
        reset();
        setIsConfirmation(true);
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
      <AnimateGradient />

      {isConfirmation ? (
        <EmailAuthConfirmation
          actionType={actionType}
          setIsConfirmation={setIsConfirmation}
          handleClose={handleClose}
        />
      ) : (
        <Card>
          <CardContent>
            <Box>
              <Typography variant="h5">{generateTitle(actionType)}</Typography>

              <Divider sx={{ my: 2 }} />

              <Typography>
                Enter the email address associated with your account and we will
                send you a {generateMessage(actionType)}.
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

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
};

export default EmailAuthForm;
