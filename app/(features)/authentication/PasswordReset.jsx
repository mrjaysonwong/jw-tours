'use client';

// third-party imports
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box } from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import { newPasswordSchema } from '@/validation/yup/user/passwordSchema';
import FormInput from '@/components/inputs/FormInput';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import { API_URLS } from '@/constants/apiRoutes';

const PasswordReset = ({ token }) => {
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { handleAlertMessage } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
  });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.AUTH}/set-new-password`;

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const { data } = await axios.patch(url, formData, { headers });

      handleAlertMessage(data.message, 'success');
      router.replace('/signin');
      reset();
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        register={register}
        inputName="password"
        type="password"
        label="Password"
        errors={errors.password}
        showPassword={showPassword}
        handleShowPassword={handleShowPassword}
      />
      <FormInput
        register={register}
        inputName="confirmPassword"
        type="password"
        label="Confirm Password"
        errors={errors.confirmPassword}
        showPassword={showPassword}
        handleShowPassword={handleShowPassword}
      />

      <Box sx={{ mt: 2 }}>
        <FormSubmitButton
          label="Set new password"
          action="auth"
          isSubmitting={isSubmitting}
          fullWidth={true}
          isSubmitSuccessful={isSubmitSuccessful}
        />
      </Box>
    </form>
  );
};

export default PasswordReset;
