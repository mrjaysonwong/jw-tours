import React, { useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
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

// local imports
import { UserDataContext } from '@/contexts/UserProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function MenuActionDialog(props) {
  const {
    open,
    setOpen,
    targetEmail,
    targetNumber,
    menuAction,
    setMenuAction,
  } = props;

  const isActionDelete = menuAction === 'delete';

  const { refetch } = useContext(UserDataContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { update } = useSession();
  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setOpen(false);
    setMenuAction('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const action = isActionDelete ? 'delete' : 'set-primary';

      const url = targetEmail
        ? `/api/account/email?action=${action}`
        : `/api/account/mobile?action=${action}`;

      const body = targetEmail
        ? { email: targetEmail }
        : { phone: targetNumber };

      const { data } = await axios.patch(url, body);
      refetch();
      setOpen(false);
      setIsSubmitting(false);

      if (targetEmail) {
        // Trigger update session
        update({});
      }

      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const getDialogTitle = () => {
    if (targetEmail) {
      return isActionDelete ? 'Delete Email Address' : 'Set Primary';
    }
    if (targetNumber) {
      return isActionDelete ? 'Delete Mobile Number' : 'Set Primary';
    }
  };

  const getDialogContent = () => {
    if (targetEmail) {
      return isActionDelete ? (
        <>
          This will delete <span>{targetEmail}</span> permanently. You cannot
          undo this action.
        </>
      ) : (
        <>
          This will set <span>{targetEmail}</span> as your primary email
          address.
        </>
      );
    }
    if (targetNumber) {
      return isActionDelete ? (
        <>
          This will delete <span>{targetNumber}</span> permanently. You cannot
          undo this action.
        </>
      ) : (
        <>
          This will set <span>{targetNumber}</span> as your primary mobile
          number.
        </>
      );
    }
  };

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onKeyUp={(e) => {
        if (e.key === 'Enter') {
          handleSubmit();
        }
      }}
    >
      <DialogTitle>{getDialogTitle()}</DialogTitle>

      <DialogContent dividers sx={{ borderBottom: 'none' }}>
        <DialogContentText sx={{ span: { color: 'var(--color-blue-light)' } }}>
          {getDialogContent()}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ mx: 2, py: 2 }}>
        <Button onClick={handleClose} disabled={isSubmitting}>
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
          ) : isActionDelete ? (
            'Delete'
          ) : (
            'Set as Primary'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
