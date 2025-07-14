import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

// internal imports
import CancellationReasonForm from './CancellationReasonForm';
import { API_URLS } from '@/constants/apiRoutes';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import { usePaymentProcessing } from '@/hooks/usePayment';
import { useUserSessionContext } from '@/contexts/UserProvider';

const CancelBookingDialog = ({
  isDialogOpen,
  setIsDialogOpen,
  bookingId,
  paymentIntentId,
  transactionId,
  isCancellable,
}) => {
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [startPolling, setStartPolling] = useState(false);
  const [isCancelled, setIsCancelled] = useState(false);

  const { data, isError } = usePaymentProcessing(transactionId, startPolling);
  const router = useRouter();
  const session = useUserSessionContext();

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setIsDialogOpen(false);
    router.refresh();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = `${API_URLS.REFUNDS}`;

      const payload = {
        paymentIntentId,
        isCancellable,
        reasonForCancellation: value,
      };

      await axios.post(url, payload);

      setStartPolling(true);
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  useEffect(() => {
    if (data?.status === 'cancelled') {
      setIsSubmitting(false);
      setStartPolling(false);
      setIsCancelled(true);
    }

    if (isError) {
      handleAlertMessage('Something went wrong. Please try again.', 'error');
    }
  }, [data, handleAlertMessage, isError]);

  return (
    <Dialog open={isDialogOpen} closeAfterTransition={false} scroll="body">
      <DialogTitle>Cancel your booking</DialogTitle>
      <IconButton
        aria-label="close"
        disabled={isSubmitting}
        onClick={handleClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 12,
        }}
      >
        <CloseIcon />
      </IconButton>

      <form onSubmit={handleSubmit}>
        <DialogContent
          dividers
          sx={{ borderBottom: 'none', maxWidth: '380px' }}
        >
          {isCancelled ? (
            <Box textAlign="center">
              <Box>
                <CheckIcon color="success" sx={{ fontSize: '4rem' }} />
                <Typography variant="h6">Booking Cancelled</Typography>
              </Box>

              <DialogContentText>
                You successfully cancelled your booking.
              </DialogContentText>
              <DialogContentText>
                We&apos;ll send an email confirming your cancellation to{' '}
                {session.user.email} and issue a refund.
              </DialogContentText>
            </Box>
          ) : (
            <>
              <DialogContentText sx={{ display: 'flex', gap: 1 }}>
                <InfoOutlinedIcon color="info" />
                This is needed to complete cancellation.
              </DialogContentText>

              <DialogContentText sx={{ my: 2 }}>
                Ref: {bookingId}
              </DialogContentText>

              <CancellationReasonForm value={value} setValue={setValue} />
            </>
          )}
        </DialogContent>

        <DialogActions sx={{ px: 3, py: 2 }}>
          {isCancelled ? (
            <Button fullWidth variant="contained" onClick={handleClose}>
              Okay, got it
            </Button>
          ) : (
            <Button
              fullWidth
              variant="contained"
              type="submit"
              disabled={isSubmitting || !value}
            >
              {isSubmitting ? (
                <CircularProgress
                  aria-describedby="loading"
                  aria-busy={true}
                  size="1.5rem"
                />
              ) : (
                'Proceed'
              )}
            </Button>
          )}
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default CancelBookingDialog;
