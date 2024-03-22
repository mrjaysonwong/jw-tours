import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  TextField,
  DialogTitle,
  DialogContent,
  DialogContentText,
  IconButton,
  Typography,
} from '@mui/material';
import { StyledDialog } from '@/app/components/custom/styles/globals';
import CloseIcon from '@mui/icons-material/Close';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSignInSchema } from '@/lib/validation/yup/signInSchema';
import { sleep } from '@/utils/sleep';
import { FieldErrorMessage } from '@/app/components/custom/messages';
import axios from 'axios';
import { errorHandler } from '@/utils/errorHandler';

export default function SendEmailLink({ open, setOpen }) {
  const router = useRouter();

  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState('');

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false);
    }
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(emailSignInSchema),
  });

  const onSubmit = async (values, event) => {
    try {
      const url = `/api/verify`;

      const { data } = await axios.patch(url, values);

      setHasError(false);
      reset();
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      setHasError(true);
      setError(errorMessage);
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && !hasError) {
      const timeoutId = setTimeout(() => {
        router.push('/');
      }, 1500);

      return () => clearTimeout(timeoutId);
    }
  }, [isSubmitSuccessful, router, hasError]);

  return (
    <>
      <StyledDialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
        }}
        disableRestoreFocus
        aria-labelledby="dialog-title"
        aria-describedby="dialog-content-text"
      >
        <DialogTitle id="dialog-title">Sign in with Email</DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <DialogContentText id="dialog-content-text">
            To Sign in, please enter your email address here.
            <br />
            We&apos;ll send one-tap sign in link.
          </DialogContentText>
          <TextField
            {...register('email')}
            fullWidth
            autoFocus
            margin="dense"
            id="email"
            name="email"
            label="Email"
            type="email"
            error={!!errors.email}
            sx={{ mt: 2 }}
          />

          <FieldErrorMessage error={errors.email} />

          <Box
            sx={{
              mt: 2,
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
          >
            <FormSubmitButton
              label="send"
              handleSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
              hasError={hasError}
              errors={errors}
            />
          </Box>
          {hasError && (
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                mt: 1,
              }}
            >
              <ErrorOutlineIcon color="error" sx={{ mr: '2px' }} />
              <Typography variant="body2" color="error">
                {error}
              </Typography>
            </Box>
          )}
        </DialogContent>
      </StyledDialog>
    </>
  );
}
