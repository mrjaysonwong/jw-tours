'use client';

import React, { useState, useRef, useContext } from 'react';
import { usePathname } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import ReCAPTCHA from 'react-google-recaptcha';

// local imports
import { Link } from '@/navigation';
import { DialogContext } from '@/components/layout/header/Navbar';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { credentialsSignInSchema } from '@/helpers/validation/yup/schemas/signInSchema';
import { AlertMessage } from '@/components/alerts/Alerts';
import { ErrorText } from '@/components/errors/ErrorTexts';
import { authenticate } from '@/app/[locale]/(auth)/signin/actions';
import { useMessageStore } from '@/stores/messageStore';

export default function Credentials() {
  let submitAttemptRef = useRef(0);

  const [captcha, setCaptcha] = useState('' || null);
  const [showPassword, setShowPassword] = useState(false);

  const { setOpen } = useContext(DialogContext);

  const pathname = usePathname();

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

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

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(credentialsSignInSchema),
  });

  const onSubmit = async (formData, event) => {
    submitAttemptRef.current++;

    try {
      const res = await authenticate(formData, pathname);

      if (submitAttemptRef.current === 5 && res?.error) {
        setCaptcha(true);
      }

      if (res?.error) {
        handleAlertMessage(res?.error?.message, 'error');
      } else {
        localStorage.setItem('signed-in', 'true');
      }
    } catch (error) {
      handleAlertMessage('An error occured. Try again.', 'error');
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
          size="small"
          margin="dense"
          label="Email"
          type="email"
          error={!!errors.email}
          autoComplete="on"
        />

        <ErrorText error={errors.email} />

        <TextField
          {...register('password')}
          fullWidth
          id="password"
          size="small"
          name="password"
          margin="dense"
          label="Password"
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

        <ErrorText error={errors.password} />

        {captcha && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onChange}
            className="recaptcha"
          />
        )}

        <Typography sx={{ my: 2, textAlign: 'right' }}>
          <Link href="/account/forgot-password">Forgot Password?</Link>
        </Typography>

        <FormSubmitButton
          label="Sign In"
          action="auth"
          handleSubmit={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          fullWidth={true}
          captcha={captcha}
        />

        <Button
          fullWidth
          variant="outlined"
          disabled={isSubmitting}
          onClick={() => setOpen(false)}
          sx={{ mt: 2 }}
        >
          Cancel
        </Button>
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
