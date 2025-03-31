'use client';

// third-party imports
import React, { useState, useRef, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Typography } from '@mui/material';
import ReCAPTCHA from 'react-google-recaptcha';

// internal imports
import { DialogContext } from '@/components/layout/header/Navbar';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { emailPasswordSchema } from '@/validation/yup/auth/signInSchema';
import { authenticate } from '@/app/[locale]/(auth)/signin/actions';
import { useMessageStore } from '@/stores/messageStore';
import { PATHNAMES } from '@/constants/pathname';
import FormInput from '@/components/inputs/FormInput';
import { errorHandler } from '@/helpers/errorHelpers';

const SignInFormFields = () => {
  let submitAttemptRef = useRef(0);

  const { isDialogOpen, setIsDialogOpen } = useContext(DialogContext);
  const [captcha, setCaptcha] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const pathname = usePathname();
  const [cookies, setCookie] = useCookies();

  const { handleAlertMessage } = useMessageStore();

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
    resolver: yupResolver(emailPasswordSchema),
  });

  const onSubmit = async (formData, event) => {
    submitAttemptRef.current++;

    try {
      const res = await authenticate(formData, pathname);

      if (submitAttemptRef.current === 5 && res?.error) {
        setCaptcha(true);
      }

      if (res?.error) {
        handleAlertMessage(res.error.message, 'error');
      } else {
        setCookie('signed-in', 'true', { path: '/' });
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          register={register}
          inputName="email"
          type="email"
          label="Email"
          errors={errors.email}
        />

        <FormInput
          register={register}
          inputName="password"
          type="password"
          label="Password"
          errors={errors.password}
          showPassword={showPassword}
          handleShowPassword={handleShowPassword}
        />

        {captcha && (
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={onChange}
            className="recaptcha"
          />
        )}

        <Typography sx={{ my: 2, textAlign: 'right' }}>
          <Link href={PATHNAMES.FORGOT_PASSWORD} scroll={false}>
            Forgot Password?
          </Link>
        </Typography>

        <FormSubmitButton
          label="Sign In"
          action="auth"
          isSubmitting={isSubmitting}
          fullWidth={true}
          captcha={captcha}
        />

        {isDialogOpen && (
          <Button
            fullWidth
            type="button"
            variant="outlined"
            disabled={isSubmitting}
            onClick={() => setIsDialogOpen(false)}
            sx={{ mt: 2 }}
          >
            Cancel
          </Button>
        )}
      </form>

      
    </>
  );
};

export default SignInFormFields;
