import React, { useState, useContext } from 'react';
import { useSession } from 'next-auth/react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Divider,
  Slide,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { PersonalSettingsContext } from '../../../tabs/MySettingsTabs';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CardMenuAction(props) {
  const { open, setOpen, targetEmail, menuAction, setMenuAction } = props;
  const isActionDelete = menuAction === 'delete';

  const { refetch } = useContext(PersonalSettingsContext);

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

      const url = `/api/account/email?action=${action}`;

      const { data } = await axios.patch(url, { email: targetEmail });

      refetch();
      setOpen(false);
      setIsSubmitting(false);

      // Trigger update session
      update({});

      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
     
        onKeyUp={(e) => {
          const ENTER = 'Enter';

          if (e.key === ENTER) {
            handleSubmit();
          }
        }}
      >
        <DialogTitle>
          {isActionDelete ? 'Delete Email Address' : 'Set Primary'}
        </DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <DialogContent>
          <DialogContentText
            sx={{ span: { color: 'var(--palette-light-blue)' } }}
          >
            {isActionDelete ? (
              <>
                This will delete <span>{targetEmail}</span> permanently. You
                cannot undo this action.
              </>
            ) : (
              <>
                This will set <span>{targetEmail}</span> as your primary email
                address.
              </>
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 2 }}>
          <Button onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>

          <Button
            variant="contained"
            disabled={isSubmitting}
            type="submit"
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
    </>
  );
}
