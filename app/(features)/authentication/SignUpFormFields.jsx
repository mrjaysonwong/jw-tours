// third-party imports
import React, { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { Box, Button, Grid } from '@mui/material';

// internal imports
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { signUpSchema } from '@/validation/yup/auth/signUpSchema';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import SignUpConfirmation from './SignUpConfirmation';
import FormInput from '@/components/inputs/FormInput';
import { API_URLS } from '@/constants/apiRoutes';
import { useAuthDialogStore } from '@/stores/dialogStore';

const SignUpFormFields = ({ showCancel = false }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { closeAuthDialog } = useAuthDialogStore();

  const [isConfirmationDialogOpen, setIsConfirmationDialogOpen] =
    useState(false);
  const emailRef = useRef('');

  const transl8 = useTranslations('signup_page');
  const cTransl8 = useTranslations('common');

  const { handleAlertMessage } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.AUTH}/signup`;

      const { data } = await axios.post(url, formData);

      if (data) {
        reset();
        setIsConfirmationDialogOpen(true);
        emailRef.current = formData.email;
      }
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container columnSpacing={2}>
          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="firstName"
              label={cTransl8('labels.fname')}
              errors={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <FormInput
              register={register}
              inputName="lastName"
              label={cTransl8('labels.lname')}
              errors={errors.lastName}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              register={register}
              inputName="email"
              type="email"
              label={cTransl8('labels.email')}
              errors={errors.email}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              register={register}
              inputName="password"
              type="password"
              label={cTransl8('labels.password')}
              errors={errors.password}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          <Grid item xs={12}>
            <FormInput
              register={register}
              inputName="confirmPassword"
              type="password"
              label={cTransl8('labels.confirm_pw')}
              errors={errors.confirmPassword}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
            />
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ mt: 2 }}>
              <FormSubmitButton
                label={transl8('button_labels.signup')}
                action="auth"
                isSubmitting={isSubmitting}
                fullWidth={true}
              />

              {showCancel && (
                <Button
                  fullWidth
                  variant="outlined"
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => closeAuthDialog()}
                  sx={{ mt: 2 }}
                >
                  Cancel
                </Button>
              )}
            </Box>
          </Grid>
        </Grid>
      </form>

      {isConfirmationDialogOpen && (
        <SignUpConfirmation
          isDialogOpen={isConfirmationDialogOpen}
          setIsDialogOpen={setIsConfirmationDialogOpen}
          email={emailRef.current}
        />
      )}
    </>
  );
};

export default SignUpFormFields;
