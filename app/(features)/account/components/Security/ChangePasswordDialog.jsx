import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
  Box,
  InputAdornment,
  IconButton,
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// local imports
import { changePasswordSchema } from '@/helpers/validation/yup/schemas/passwordSchema';
import { ErrorText } from '@/components/errors/ErrorTexts';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';

export default function ChangePasswordDialog({ open, setOpen }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(changePasswordSchema) });

  const onSubmit = async (values) => {
    try {
      const action = 'change-password';
      const url = `/api/account/security?action=${action}`;

      const { data } = await axios.patch(url, values);

      setOpen(false);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        sx={{
          width: {
            sm: 'clamp(360px, 50%, 420px)',
            md: 'clamp(420px, 50%, 420px)',
          },
          margin: 'auto',
        }}
      >
        <DialogTitle>Change Password</DialogTitle>

        <form>
          <DialogContent dividers sx={{ borderBottom: 'none' }}>
            <DialogContentText sx={{ mb: 3 }}>
              Set a strong password to prevent unauthorized access to your
              account.
            </DialogContentText>
            <TextField
              {...register('currentPassword')}
              fullWidth
              size="small"
              label="Current Password"
              name="currentPassword"
              error={!!errors.currentPassword}
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

            <ErrorText error={errors.currentPassword} />

            <Box sx={{ my: 2 }}>
              <TextField
                {...register('newPassword')}
                fullWidth
                size="small"
                label="New Password"
                name="newPassword"
                error={!!errors.newPassword}
                type={showNewPassword ? 'text' : 'password'}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleShowNewPassword}>
                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <ErrorText error={errors.newPassword} />
            </Box>

            <TextField
              {...register('confirmNewPassword')}
              fullWidth
              size="small"
              label="Confirm New Password"
              name="confirmNewPassword"
              error={!!errors.confirmNewPassword}
              type={showNewPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowNewPassword}>
                      {showNewPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <ErrorText error={errors.confirmNewPassword} />
          </DialogContent>

          <DialogActions sx={{ mx: 2, py: 2 }}>
            <Button disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>

            <FormSubmitButton
              label="Change Password"
              action="add"
              handleSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
