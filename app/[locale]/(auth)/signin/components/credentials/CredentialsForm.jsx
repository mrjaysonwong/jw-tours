'use client';

import React, { useState, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { credentialsSignInSchema } from '@/lib/validation/yup/signInSchema';
import { FieldErrorMessage } from '@/app/components/custom/texts';
import { authenticate } from '../../actions';
import ReCAPTCHA from 'react-google-recaptcha';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertMessage } from '@/app/components/custom/texts';
import { useMessageStore } from '@/stores/messageStore';
import { signInCredentialsTranslations } from '@/lib/validation/validationTranslations';

export default function CredentialsForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  let submitAttemptRef = useRef(0);

  const [captcha, setCaptcha] = useState('' || null);
  const [showPassword, setShowPassword] = useState(false);

  const t = useTranslations('signin_page');
  const t1 = useTranslations('common');

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onChange = () => {
    setCaptcha(false);
    submitAttemptRef.current = 0;
    document
      .querySelectorAll(`iframe[src*=recaptcha]`)
      .forEach((a) => a.remove());
  };

  const translations = signInCredentialsTranslations(t1);
  const schema = credentialsSignInSchema(translations);

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
      const res = await authenticate(formData, callbackUrl);

      if (submitAttemptRef.current === 5 && res?.error) {
        setCaptcha(true);
      }

      if (res?.error) {
        handleAlertMessage(res?.error?.message, 'error');
      } else {
        localStorage.setItem('signed-in', 'true');
      }
    } catch (error) {
      handleAlertMessage(t1('errors.try_again'), 'error');
    }
  };

  return (
    <>
      <form>
        <TextField
          {...register('email')}
          fullWidth
          size="small"
          id="email"
          name="email"
          label={t1('labels.email')}
          type="email"
          error={!!errors.email}
          autoComplete="on"
        />

        <FieldErrorMessage error={errors.email} />

        <TextField
          {...register('password')}
          fullWidth
          size="small"
          id="password"
          name="password"
          label={t1('labels.password')}
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
          sx={{ mt: 2 }}
        />

        <FieldErrorMessage error={errors.password} />

        {captcha && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onChange}
            className="recaptcha"
          />
        )}

        <FormSubmitButton
          label={t('button_labels.signin')}
          action="auth"
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          isSubmitSuccessful={isSubmitSuccessful}
          fullWidth={true}
          captcha={captcha}
        />
      </form>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
