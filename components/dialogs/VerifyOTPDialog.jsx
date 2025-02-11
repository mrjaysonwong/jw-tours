import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
  Typography,
  Slide,
} from '@mui/material';
import axios from 'axios';

// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { API_URLS } from '@/constants/api';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VerifyOTPDialog = ({
  isOTPOpen,
  setIsOTPOpen,
  phoneDetails,
  email,
  type,
}) => {
  const params = useParams();

  const { userId, refetch, adminRefetch } = useUserDetailsContext();

  const [counter, setCounter] = useState(60);
  const [otp, setOTP] = useState('');

  const notSixDigits = otp.length < 6 || otp === '';

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const dCode = phoneDetails?.phone?.dialCode || '';
  const phoneNumber = phoneDetails?.phone?.phoneNumber || '';
  const dialCode = dCode.replace(/\+/g, '');
  const maskedPart =
    phoneNumber.length >= 4 ? '*'.repeat(phoneNumber.length - 4) : '';
  const lastFourDigits = phoneNumber.slice(-4);

  const handleOnClose = () => setIsOTPOpen(false);

  const handleChange = (event) => setOTP(event.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = `${API_URLS.USERS}/${userId}/verify-otp`;

      const requestData = {
        type,
        otp,
        email,
        phone: { dialCode, phoneNumber },
      };

      const { data } = await axios.patch(url, requestData);

      if (params.id) {
        adminRefetch();
      } else {
        refetch();
      }

      handleAlertMessage(data.statusText, 'success');
      setIsOTPOpen(false);
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const url = `${API_URLS.USERS}/${userId}/send-otp`;

      const requestData = { type, email, phone: { dialCode, phoneNumber } };
      const { data } = await axios.post(url, requestData);

      setCounter(60);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (isOTPOpen) {
      setCounter(60);
      const intervalId = setInterval(() => {
        setCounter((prev) => (prev > 0 ? prev - 1 : prev));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isOTPOpen]);

  const sendTo = () => {
    if (email) {
      return <span>{email}</span>;
    } else {
      return (
        <>
          <span>+</span>
          <span>
            {dialCode} {maskedPart}
            {lastFourDigits}
          </span>
        </>
      );
    }
  };

  return (
    <Dialog open={isOTPOpen} TransitionComponent={Transition}>
      <DialogTitle>
        Verify your {email ? 'Email Address' : 'Mobile Number'}
      </DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent dividers sx={{ borderBottom: 'none' }}>
          <DialogContentText
            sx={{ mb: 3, span: { color: 'var(--color-blue-light)' } }}
          >
            OTP has been sent to {sendTo()}
          </DialogContentText>
          <DialogContentText>Enter OTP</DialogContentText>
          <TextField
            fullWidth
            size="small"
            name="otp"
            placeholder="●●●●●●"
            autoComplete="off"
            onChange={handleChange}
            inputProps={{ maxLength: 6 }}
            sx={{ letterSpacing: '4px', my: 1 }}
          />

          <Typography
            color={counter ? 'gray' : 'primary.main'}
            sx={{ cursor: counter ? 'progress' : 'pointer' }}
          >
            {counter ? (
              `Resend OTP in (${counter}s)`
            ) : (
              <span onClick={handleResendOTP}>Resend OTP</span>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mx: 2, py: 2 }}>
          <Button type="button" disabled={isSubmitting} onClick={handleOnClose}>
            Cancel
          </Button>

          <FormSubmitButton
            label="Verify"
            action="update"
            isSubmitting={isSubmitting}
            notSixDigits={notSixDigits}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VerifyOTPDialog;
