// third-party imports
import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
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
import {
  useUserDetailsContext,
  useUserSessionContext,
} from '@/contexts/UserProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { sleep } from '@/utils/sleep';
import { getUrl } from '@/utils/authActionMap';
import { getRequestData } from '@/helpers/requestHelpers';
import { fireBaseAuthErrorMap } from '@/helpers/errorHelpers';
import { getLastSegment } from '@/helpers/pageHelpers';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const VerifyOTPDialog = ({
  title,
  isOTPOpen,
  setIsOTPOpen,
  setIsDialogOpen,
  setIsAddContactOpen,
  phoneDetails,
  email,
  type,
  selected = [],
  password,
  confirmationResult,
}) => {
  const [counter, setCounter] = useState(60);
  const [otp, setOTP] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const notEnteredAllDigits = otp.length < 6 || otp === '';

  const { userId, refetch } = useUserDetailsContext();

  const session = useUserSessionContext();
  const isAdmin = session.user.role === 'admin';
  const adminEmail = session.user.email;

  const pathname = usePathname();
  const isUserList = getLastSegment(pathname) === 'users';

  const { handleAlertMessage } = useMessageStore();

  const dCode = phoneDetails?.phone?.dialCode || '';
  const phoneNumber = phoneDetails?.phone?.phoneNumber || '';
  const dialCode = dCode.replace(/\+/g, '');
  const maskedPhone =
    phoneNumber.length >= 4 ? '*'.repeat(phoneNumber.length - 4) : '';
  const lastFourDigits = phoneNumber.slice(-4);

  const handleClose = () => {
    setIsOTPOpen(false);
  };

  const handleChange = (event) => setOTP(event.target.value);

  const verifyFirebaseOTP = async () => {
    try {
      await confirmationResult.confirm(otp);
    } catch (error) {
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const action = 'verify';
      const url = getUrl({ type, action, userId });

      const requestData = getRequestData({
        type,
        otp,
        email,
        dialCode,
        phoneNumber,
        selected,
      });

      const { data } =
        type === '2FA-account-deletion'
          ? await axios.delete(url, requestData)
          : await axios.patch(url, requestData);

      if (data.message === 'Mobile number was already verified.') {
        handleAlertMessage(data.message, 'error');
        return;
      }

      if (confirmationResult) {
        await verifyFirebaseOTP();

        await axios.patch(url, {
          type,
          otp,
          phone: { dialCode, phoneNumber },
          isFirebaseAuthOk: true,
        });
      }

      handleAlertMessage(data.message, 'success');
      setIsOTPOpen(false);

      if (isAdmin && isUserList) {
        // for admin account deletion
        setIsDialogOpen(false);

        await sleep(4000);
        location.reload();
      } else {
        // non-admin
        refetch();
        setIsAddContactOpen(false);
      }
    } catch (error) {
      const fireBaseAuthError =
        fireBaseAuthErrorMap[error.code] || fireBaseAuthErrorMap.default;

      if (fireBaseAuthError && confirmationResult) {
        handleAlertMessage(fireBaseAuthError, 'error');
      } else {
        const { errorMessage } = errorHandler(error);
        handleAlertMessage(errorMessage, 'error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      const action = 'send';
      const url = getUrl({ type, action, userId });

      const requestData = getRequestData({
        type,
        otp,
        email,
        dialCode,
        phoneNumber,
        password,
      });

      const { data } = await axios.post(url, requestData);

      setCounter(60);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (isOTPOpen && !confirmationResult) {
      setCounter(60);
      const intervalId = setInterval(() => {
        setCounter((prev) => (prev > 0 ? prev - 1 : prev));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [isOTPOpen, confirmationResult]);

  const sendTo = () => (
    <span>
      {email ||
        (type === '2FA-account-deletion' && isAdmin
          ? adminEmail
          : `+${dialCode} ${maskedPhone} ${lastFourDigits}`)}
    </span>
  );

  return (
    <Dialog open={isOTPOpen} TransitionComponent={Transition}>
      <DialogTitle>{title}</DialogTitle>

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

          {!confirmationResult && (
            <Typography color={counter ? 'gray' : 'primary.main'}>
              {counter ? (
                <span style={{ cursor: counter && 'wait' }}>
                  Resend OTP in ({counter}s)
                </span>
              ) : (
                <span
                  onClick={handleResendOTP}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  Resend OTP
                </span>
              )}
            </Typography>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button type="button" disabled={isSubmitting} onClick={handleClose}>
            Cancel
          </Button>

          <FormSubmitButton
            label="Verify"
            isSubmitting={isSubmitting}
            notEnteredAllDigits={notEnteredAllDigits}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default VerifyOTPDialog;
