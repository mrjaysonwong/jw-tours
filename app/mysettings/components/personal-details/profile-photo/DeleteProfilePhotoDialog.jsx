import { useContext, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMessageStore } from '@/stores/messageStore';
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
import { PersonalSettingsContext } from '../PersonalDetails';
import { errorHandler } from '@/utils/helper/errorHandler';

export default function DeleteProfilePhotoDialog({ open, setOpenDelete }) {
  const { refetch } = useContext(PersonalSettingsContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { update } = useSession();

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setOpenDelete(false);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const action = 'delete-profilephoto';
      const url = `/api/account/details?action=${action}`;

      const { data } = await axios.patch(url);

      setOpenDelete(false);
      setIsSubmitting(false);
      refetch();

      // Trigger update session
      update({});

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
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this profile photo?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            variant="contained"
            type="submit"
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
}
