import React, { useState, useContext, useEffect  } from 'react';
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
  Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { contactInfoSchema } from '@/lib/validation/yup/personalDetailsSchema';
import { ErrorText } from '@/utils/helper/form-text/ErrorText';
import { PersonalSettingsContext } from '../PersonalDetails';
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';
import { AlertMessage } from '@/app/components/custom/messages';

export default function VerifyEmailOTP(props) {
  const { open, setOpen, email } = props;

  const handleOnClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Verify your Email</DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <form>
          <DialogContent>
            <DialogContentText sx={{ mb: 3, span: { color: '#42a5f5' } }}>
              OTP has been sent to <span>{email}</span>
            </DialogContentText>

            <DialogContentText>Enter OTP</DialogContentText>
            <TextField
              fullWidth
              size="small"
              name="otp"
              placeholder="●●●●●●"
              autoComplete="off"
              sx={{ letterSpacing: '4px', my: 1 }}
              inputProps={{ maxLength: 6 }}
            />
          </DialogContent>

          <DialogActions sx={{ m: 2 }}>
            <Button onClick={handleOnClose}>Cancel</Button>
            <Button variant="contained" type="submit">
              Verify
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
