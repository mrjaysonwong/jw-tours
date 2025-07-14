import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Rating,
  Box,
  TextField,
  Typography,
  Avatar,
} from '@mui/material';
import axios from 'axios';

// internal imports
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { reviewSchema } from '@/validation/yup/review/reviewSchema';
import ErrorText from '@/components/errors/ErrorText';
import { API_URLS } from '@/constants/apiRoutes';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';

const LeaveReviewDialog = ({ isDialogOpen, setIsDialogOpen, reviewData }) => {
  const { tourImage, ...reviewProps } = reviewData;
  const router = useRouter();
  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(reviewSchema),
    defaultValues: {
      rating: 0,
    },
  });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.TOURS}/${reviewData.tour}/reviews`;

      const payload = {
        ...formData,
        ...reviewProps,
      };

      const { data } = await axios.post(url, payload);

      handleAlertMessage(data.message, 'success');
      handleClose();
      router.refresh();
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <Dialog open={isDialogOpen} onClose={handleClose} scroll="body">
      <DialogTitle textAlign="center">Leave a Review</DialogTitle>
      <DialogContent sx={{ textAlign: 'center' }}>
        <form id="submit-form" onSubmit={handleSubmit(onSubmit)}>
          <Avatar
            src={reviewData.tourImage}
            alt="Tour Image"
            sx={{
              borderRadius: '8px',
              width: 100,
              height: 100,
              mx: 'auto',
              my: 1,
            }}
          />
          <DialogContentText>
            How would you rate your experience?
          </DialogContentText>
          <DialogContentText sx={{ fontWeight: 550, my: 1 }}>
            Rating
          </DialogContentText>

          <Box>
            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <>
                  <Rating
                    {...field}
                    value={field.value}
                    size="large"
                    onChange={(_, newValue) => {
                      field.onChange(newValue);
                    }}
                    sx={{ color: '#FCC737' }}
                  />
                  <ErrorText error={errors.rating} />
                </>
              )}
            />
          </Box>

          <Box sx={{ my: 1 }}>
            <Typography sx={{ textAlign: 'left', fontWeight: 500 }}>
              Review
            </Typography>
            <TextField
              {...register('comment')}
              fullWidth
              multiline
              rows={4}
              placeholder="Tell us about your own personal experience taking this tour."
              error={!!errors.comment}
            />

            <ErrorText error={errors.comment} />
          </Box>
        </form>
      </DialogContent>

      <DialogActions sx={{ mb: 2 }}>
        <Box sx={{ mx: 'auto' }}>
          <FormSubmitButton
            form="submit-form"
            label="Submit review"
            isSubmitting={isSubmitting}
          />
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default LeaveReviewDialog;
