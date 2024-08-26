'use client';

import React, { useState } from 'react';
import { StyledCard } from '@/app/components/global-styles/globals';
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { newPasswordSchema } from '@/lib/validation/yup/passwordSchema';
import axios from 'axios';
import { FieldErrorMessage } from '@/app/components/custom/texts';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { errorHandler } from '@/utils/helper/errorHandler';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/app/components/custom/texts';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

export default function PasswordReset({ token, tokenExists, requestDone }) {
  const [showPassword, setShowPassword] = useState(false);

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

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

  const onSubmit = async (formData, event) => {
    try {
      const action = 'set-new-password';

      const url = `/api/account/security?action=${action}`;

      const bodyObj = {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        token: token,
      };

      await axios.patch(url, bodyObj);

      location.reload();
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      {!tokenExists && (
        <Snackbar
          open={true}
          message="Sorry, this password reset link is either invalid or has expired. Please request a new password reset link."
        />
      )}

      <StyledCard
        sx={{
          p: 3,
          flexDirection: 'column',
          width: 'clamp(300px, 50%, 300px)',
        }}
      >
        <Typography variant="h6" sx={{mb: 2}}>Create a new password</Typography>

        {requestDone && (
          <>
            <Box
              sx={{
                p: 2,
                bgcolor: '#fde0e0',
                my: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CheckCircleIcon sx={{ color: '#66bb6a' }} />
              <Typography variant="body2" sx={{ color: 'black', mx: 1 }}>
                Your password has been updated.
              </Typography>
            </Box>
          </>
        )}

        <form
          onKeyUp={(e) => {
            const ENTER = 'Enter';

            if (e.key === ENTER) {
              handleSubmit(onSubmit);
            }
          }}
        >
          <TextField
            {...register('password')}
            fullWidth
            label="Password"
            name="password"
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
          />

          <FieldErrorMessage error={errors.password} />

          <TextField
            {...register('confirmPassword')}
            fullWidth
            label="Confirm Password"
            name="confirmPassword"
            error={!!errors.confirmPassword}
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

          <FieldErrorMessage error={errors.confirmPassword} />

          <Button
            fullWidth
            variant="contained"
            disabled={isSubmitting || !tokenExists || requestDone}
            type="submit"
            onClick={handleSubmit(onSubmit)}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? (
              <CircularProgress
                aria-describedby="loading"
                aria-busy={true}
                size="1.5rem"
              />
            ) : (
              'Set new password'
            )}
          </Button>
        </form>
      </StyledCard>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
