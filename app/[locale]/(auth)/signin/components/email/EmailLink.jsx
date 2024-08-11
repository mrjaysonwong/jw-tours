'use client';

import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import {
  StyledContainer as MainContainer,
  StyledCard,
} from '@/app/components/global-styles/globals';
import { Link } from '@/navigation';
import { Box, Button, TextField, Typography } from '@mui/material';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSignInSchema } from '@/lib/validation/yup/signInSchema';
import { FieldErrorMessage } from '@/app/components/custom/texts';
import axios from 'axios';
import { errorHandler } from '@/utils/helper/errorHandler';
import ReCAPTCHA from 'react-google-recaptcha';
import { AlertMessage } from '@/app/components/custom/texts';
import { useMessageStore } from '@/stores/messageStore';
import Confirmation from '@/app/components/confirmation/Confirmation';
import { signInEmailTranslations } from '@/lib/validation/validationTranslations';

export default function EmailLink() {
  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  let submitAttemptRef = useRef(0);

  let emailRef = useRef('');

  const [captcha, setCaptcha] = useState('' || null);
  const [message, setMessage] = useState('');

  const t = useTranslations('signin_page');
  const t1 = useTranslations('common');

  const translations = signInEmailTranslations(t1);

  const onChange = () => {
    setCaptcha(false);
    submitAttemptRef.current = 0;
    document
      .querySelectorAll(`iframe[src*=recaptcha]`)
      .forEach((a) => a.remove());
  };

  const schema = emailSignInSchema(translations);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(schema),
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
      const { errorMessage } = errorHandler(error, t1);

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
        {emailRef.current ? (
          <Confirmation
            message={message}
            email={emailRef.current}
            action="signin"
          />
        ) : (
          <>
            <StyledCard sx={{ width: 'clamp(280px, 50%, 340px)' }}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="h5">
                  {t('headers.one_time_link')}
                </Typography>

                <Typography color="gray">
                  {t('paragraphs.enter_verified_email')}
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
                  label={t1('labels.email')}
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
                  label={t1('button_labels.send')}
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
                    {t1('button_labels.goback')}
                  </Button>
                </Link>
              </form>
            </StyledCard>
          </>
        )}
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
