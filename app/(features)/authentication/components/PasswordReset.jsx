'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Typography,
  TextField,
  Button,
  Snackbar,
  InputAdornment,
  IconButton,
  CircularProgress,
  Box,
  Divider,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// local imports
import { StyledAuthCard } from '@/components/styled/StyledCards';
import { newPasswordSchema } from '@/helpers/validation/yup/schemas/passwordSchema';
import { AlertMessage } from '@/components/alerts/Alerts';
import { ErrorText } from '@/components/errors/ErrorTexts';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';

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

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const bodyObj = {
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };

      await axios.patch(url, bodyObj, { headers });

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
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
          message="Sorry, this password reset link is either invalid or has expired. Please request a new password reset link."
        />
      )}

      <StyledAuthCard min={360} max={330}>
        <Typography variant="h5">Create a new password</Typography>

        <Divider sx={{ my: 2 }} />

        {requestDone && (
          <>
            <Box
              sx={{
                p: 1,
                bgcolor: '#fde0e0',
                mb: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CheckCircleIcon sx={{ color: '#66bb6a', mr: 1 }} />
              <Typography variant="body2" sx={{ color: 'black' }}>
                Your password has been updated.
              </Typography>
            </Box>
          </>
        )}

        <Box
          component="form"
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
            margin="dense"
            size="small"
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

          <ErrorText error={errors.password} />

          <TextField
            {...register('confirmPassword')}
            fullWidth
            margin="dense"
            size="small"
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

          <ErrorText error={errors.confirmPassword} />

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
        </Box>
      </StyledAuthCard>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
