import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Slide,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

// internal imports
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/apiRoutes';
import { useReviewListDataContext } from '@/contexts/ReviewListProvider';

const actionMap = {
  approve: 'approve',
  reject: 'reject',
  delete: 'delete',
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ReviewMenuActionDialog = ({
  isDialogOpen,
  setDialogState,
  menuAction,
  setMenuAction,
  id,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { refetch } = useReviewListDataContext();

  const { handleAlertMessage } = useMessageStore();

  const actionText = actionMap[menuAction];

  const handleClose = () => {
    setDialogState({ open: false });
    setMenuAction('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const method = actionText === 'delete' ? 'delete' : 'patch';

    try {
      const url = `${API_URLS.REVIEWS}/${id}`;
      const payload = { menuAction };

      const { data } = await axios[method](url, payload);

      refetch();
      setIsSubmitting(false);
      handleClose();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      console.error(error);
      const { errorMessage } = errorHandler(error);

      handleAlertMessage(errorMessage, 'error');
      handleClose();
    }
  };

  return (
    <Dialog open={isDialogOpen} TransitionComponent={Transition}>
      <DialogTitle sx={{ textTransform: 'capitalize' }}>
        {actionText} Review
      </DialogTitle>

      <DialogContent dividers sx={{ borderBottom: 'none', maxWidth: '410px' }}>
        <DialogContentText>
          Are you sure you want to {actionText} this review?
        </DialogContentText>
        <DialogContentText
          sx={{
            span: { color: 'var(--color-blue-light)' },
          }}
        >
          Review ID: <span>{id}</span>
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button disabled={isSubmitting} onClick={handleClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
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
            actionText
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewMenuActionDialog;
