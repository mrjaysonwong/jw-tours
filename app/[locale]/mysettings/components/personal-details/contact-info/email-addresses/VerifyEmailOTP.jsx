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
import { PersonalSettingsContext } from '../../PersonalDetails';
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function VerifyEmailOTP(props) {
  const { open, setOpenOTP, email } = props;
  const { refetch } = useContext(PersonalSettingsContext);

  const [counter, setCounter] = useState(60);

  const [otp, setOtp] = useState(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setOpenOTP(false);
  };

  const handleChange = (event) => {
    const { value } = event.target;

    setOtp(value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const url = `/api/account/email/verify?email=${email}`;

      const { data } = await axios.patch(url, { otp });

      setOpenOTP(false);
      setIsSubmitting(false);

      refetch();
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);

      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const handleResendOTP = async () => {
    try {
      const url = '/api/account/email';
      const { data } = await axios.post(url, { email });

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
        setCounter((prevCounter) =>
          prevCounter > 0 ? prevCounter - 1 : prevCounter
        );
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [open]);

  return (
    <>
      <Dialog open={open} TransitionComponent={Transition}>
        <DialogTitle>Verify your Email Address</DialogTitle>

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
              defaultValue={otp}
              onChange={handleChange}
              inputProps={{ maxLength: 6 }}
              sx={{ letterSpacing: '4px', my: 1 }}
            />

            <Typography
              color={counter ? 'gray' : 'primary.main'}
              sx={{
                span: {
                  cursor: 'pointer',
                },
              }}
            >
              {counter ? (
                `Resend OTP in (${counter}s)`
              ) : (
                <span onClick={handleResendOTP}>Resend OTP</span>
              )}
            </Typography>
          </DialogContent>

          <DialogActions sx={{ m: 2 }}>
            <Button disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="contained"
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
            >
              {isSubmitting ? (
                <CircularProgress
                  aria-describedby="loading"
                  aria-busy={true}
                  size="1.5rem"
                />
              ) : (
                'Verify'
              )}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
