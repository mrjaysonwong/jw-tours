import React, { useState, useContext, useEffect } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Divider,
  TextField,
  Typography,
  Slide,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

// local imports
import { UserDataContext } from '@/contexts/UserProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function OTPDialog({
  open,
  setOpenOTP,
  email,
  completePhone,
  type,
}) {
  const { refetch } = useContext(UserDataContext);
  const [counter, setCounter] = useState(60);
  const [otp, setOTP] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { handleAlertMessage } = useMessageStore();

  const dialCode = completePhone?.phone?.dialCode || '';
  const phoneNumber = completePhone?.phone?.phoneNumber || '';
  const dialCodeNum = dialCode.replace(/\+/g, '');
  const maskedPart =
    phoneNumber.length >= 4 ? '*'.repeat(phoneNumber.length - 4) : '';
  const lastFourDigits = phoneNumber.slice(-4);

  const handleClose = () => setOpenOTP(false);

  const handleChange = (event) => setOTP(event.target.value);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const url =
        type === 'email'
          ? `/api/account/email/verify?email=${email}`
          : `/api/account/mobile/verify?dialcode=${dialCodeNum}&number=${phoneNumber}`;

      const { data } = await axios.patch(url, { otp });

      setOpenOTP(false);
      refetch();
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const url =
        type === 'email' ? '/api/account/email' : '/api/account/mobile';

      const body = type === 'email' ? { email } : completePhone;
      const { data } = await axios.post(url, body);

      setCounter(60);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (open) {
      setCounter(60);
      const intervalId = setInterval(() => {
        setCounter((prev) => (prev > 0 ? prev - 1 : prev));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [open]);

  const sendTo = () => {
    if (type === 'email') {
      return <span>{email}</span>;
    } else {
      return (
        <span>
          {dialCode} {maskedPart}
          {lastFourDigits}
        </span>
      );
    }
  };

  return (
    <Dialog open={open} TransitionComponent={Transition}>
      <DialogTitle>
        Verify your {type === 'email' ? 'Email Address' : 'Mobile Number'}
      </DialogTitle>

      <form>
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
          <Typography color={counter ? 'gray' : 'primary.main'}>
            {counter ? (
              `Resend OTP in (${counter}s)`
            ) : (
              <span onClick={handleResendOTP}>Resend OTP</span>
            )}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ mx: 2, py: 2 }}>
          <Button disabled={isSubmitting} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            type="submit"
            disabled={isSubmitting}
            onClick={handleSubmit}
          >
            {isSubmitting ? <CircularProgress size="1.5rem" /> : 'Verify'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
