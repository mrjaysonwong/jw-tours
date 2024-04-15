import React, { useState, useRef, useEffect } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { credentialsSignInSchema } from '@/lib/validation/yup/signInSchema';
import { useSearchParams } from 'next/navigation';
import { FieldErrorMessage } from '@/app/components/custom/messages';
import { authenticate } from '@/app/(auth)/signin/actions';
import ReCAPTCHA from 'react-google-recaptcha';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { AlertMessage } from '@/app/components/custom/messages';
import { useMessageStore } from '@/stores/messageStore';

export default function CredForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const [hasError, setHasError] = useState(false);

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  let countRef = useRef(0);

  const [captcha, setCaptcha] = useState('' || null);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const onChange = () => {
    setCaptcha(false);
    countRef.current = 0;
    document
      .querySelectorAll(`iframe[src*=recaptcha]`)
      .forEach((a) => a.remove());
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(credentialsSignInSchema),
  });

  const onSubmit = async (formData, event) => {
    countRef.current = countRef.current + 1;

    const res = await authenticate(formData, callbackUrl);

    if (countRef.current === 5 && res?.error) {
      setCaptcha(true);
    }

    if (res?.error) {
      setHasError(true);
      handleAlertMessage(res.error.message, 'error');
    } else {
      localStorage.setItem('signed-in', 'true');
      setHasError(false);
    }
  };

  return (
    <>
      <form>
        <TextField
          {...register('email')}
          fullWidth
          id="email"
          name="email"
          label="Email"
          type="email"
          error={!!errors.email}
          autoComplete="on"
        />

        <FieldErrorMessage error={errors.email} />

        <TextField
          {...register('password')}
          fullWidth
          id="password"
          name="password"
          label="Password"
          error={!!errors.password}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
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
          label="sign in"
          mode="auth"
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          isSubmitSuccessful={isSubmitSuccessful}
          hasError={hasError}
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
