import { useContext, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import axios from 'axios';
import { DialogContext } from '../PersonalDetails';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';

export default function DeleteProfilePhotoDialog({ open, setOpenDelete }) {
  const { userId, refetch } = useContext(DialogContext);
  const [loading, setLoading] = useState(false);
  const { handleAlertMessage } = useMessageStore();

  const handleOnClose = () => {
    setOpenDelete(false);
  };

  const handleDelete = async () => {
    setLoading(true);

    try {
      const mode = 'delete-profilephoto';
      const url = `/api/users?userId=${userId}&mode=${mode}`;

      const { data } = await axios.patch(url);

      setOpenDelete(false);
      setLoading(false);
      refetch();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
      setLoading(false);
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Delete Photo</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this profile photo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleOnClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            disabled={loading}
            variant="contained"
            color="error"
          >
            {loading ? 'Deleting...' : 'Delete'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
