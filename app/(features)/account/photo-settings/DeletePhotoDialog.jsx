import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';

// internal imports
import { useProfilePhotoContext } from '@/contexts/ProfilePhotoProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/api';

const DeleteProfilePhotoDialog = ({ open, setOpen }) => {
  const params = useParams();

  const { userId, refetch, adminRefetch } = useProfilePhotoContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { update } = useSession();

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const url = `${API_URLS.USERS}/${userId}/profile-photo`;

      const requestData = { actionType: 'delete-photo' };
      const { data } = await axios.patch(url, requestData);

      setOpen(false);
      setIsSubmitting(false);

      if (params.id) {
        adminRefetch();
      } else {
        refetch();
        // Trigger update session
        update({});
      }

      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onKeyUp={(e) => {
          const ENTER = 'Enter';

          if (e.key === ENTER) {
            handleSubmit();
          }
        }}
      >
        <DialogTitle>Delete Photo</DialogTitle>
        <DialogContent dividers sx={{ borderBottom: 'none' }}>
          <DialogContentText>
            Are you sure you want to delete this profile photo?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ mx: 2, py: 2 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>

          <Button
            variant="contained"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircularProgress
                aria-describedby="loading"
                aria-busy={true}
                size="1.5rem"
              />
            ) : (
              'Delete'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DeleteProfilePhotoDialog;
