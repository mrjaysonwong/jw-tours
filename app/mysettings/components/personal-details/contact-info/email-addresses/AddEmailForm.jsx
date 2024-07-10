import React, { useState, useContext } from 'react';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Divider,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactInfoSchema } from '@/lib/validation/yup/personalDetailsSchema';
import { ErrorText } from '@/utils/helper/form-text/ErrorText';
import { PersonalSettingsContext } from '../../PersonalDetails';
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';

export default function AddEmailForm(props) {
  const { open, setOpen, setOpenOTP, setEmail } = props;

  const { user, refetch } = useContext(PersonalSettingsContext);

  const [hasError, setHasError] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(contactInfoSchema),
  });

  const handleOnClose = () => {
    setOpen(false);
    resetField('email');
    setHasError(false);
  };

  // review if it is in right api endpoint
  // proceed to verify email otp api

  const onSubmit = async (formData) => {
    try {
      const mode = 'add-email';
      const url = `/api/users?userId=${user._id}&mode=${mode}`;
    

      const { data } = await axios.patch(url, formData);
      console.log('foo', data);

      setOpenOTP(true);
      setOpen(false);
      setEmail(formData.email);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setHasError(true);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Add Email address</DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <form>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              A one-time password (OTP) will be sent to your email address.
            </DialogContentText>
            <TextField
              {...register('email')}
              fullWidth
              label="Email address"
              name="email"
              error={!!errors.email || hasError}
              autoComplete="on"
            />

            {errors.email && <ErrorText error={errors.email} />}
          </DialogContent>

          <DialogActions sx={{ m: 2 }}>
            <Button disabled={isSubmitting} onClick={handleOnClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              color={hasError ? 'error' : undefined}
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
            >
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
