import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useParams } from 'next/navigation';
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
import { useUserDetailsContext } from '@/contexts/UserProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/apiRoutes';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ContactMenuActionDialog = ({
  isDialogOpen,
  setDialogState,
  targetEmail,
  targetNumber,
  menuAction,
  setMenuAction,
}) => {
  const { userId, refetch } = useUserDetailsContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const params = useParams();
  const { update } = useSession();
  const { handleAlertMessage } = useMessageStore();

  const [dialCode, phoneNumber] = targetNumber.split(' ');
  const isAction = (action) => menuAction === action;

  const getAction = () => (isAction('set-primary') ? 'update' : 'delete');

  const getMobileNumberAction = () => getAction();
  const getEmailAction = () => getAction();

  const actionType = targetEmail
    ? `${getEmailAction()}-email`
    : `${getMobileNumberAction()}-mobile`;

  const handleClose = () => {
    setDialogState({ open: false });
    setMenuAction('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const url = targetEmail
        ? `${API_URLS.USERS}/${userId}/email`
        : `${API_URLS.USERS}/${userId}/mobile-number`;

      const payload = targetEmail
        ? { actionType, email: targetEmail }
        : { actionType, phone: { dialCode, phoneNumber } };

      const { data } = await axios.patch(url, payload);

      refetch();
      setDialogState({ open: false });
      setIsSubmitting(false);

      if (targetEmail && isAction('set-primary') && !params.id) {
        // Trigger update session
        update({});
      }

      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const getTitle = () => {
    if (targetEmail) {
      return isAction('delete') ? 'Delete Email Address' : 'Set Primary';
    }
    if (targetNumber) {
      return isAction('delete') ? 'Delete Mobile Number' : 'Set Primary';
    }
  };

  const getContentText = () => {
    if (targetEmail) {
      return isAction('delete') ? (
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
      return isAction('delete') ? (
        <>
          This will delete <span>+{targetNumber}</span> permanently. You cannot
          undo this action.
        </>
      ) : (
        <>
          This will set <span>+{targetNumber}</span> as your primary mobile
          number.
        </>
      );
    }
  };

  return (
    <Dialog open={isDialogOpen} TransitionComponent={Transition}>
      <DialogTitle>{getTitle()}</DialogTitle>

      <DialogContent dividers sx={{ borderBottom: 'none', maxWidth: '410px' }}>
        <DialogContentText
          sx={{
            span: { color: 'var(--color-blue-light)' },
          }}
        >
          {getContentText()}
        </DialogContentText>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
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
          ) : isAction('delete') ? (
            'Delete'
          ) : (
            'Set as Primary'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ContactMenuActionDialog;
