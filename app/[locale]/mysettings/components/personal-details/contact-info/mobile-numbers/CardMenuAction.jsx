import React, { useState, useContext } from 'react';
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
import { PersonalSettingsContext } from '../../PersonalDetails';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function CardMenuAction(props) {
  const { open, setOpen, targetNumber, menuAction, setMenuAction } = props;
  const isActionDelete = menuAction === 'delete';

  const { refetch } = useContext(PersonalSettingsContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setOpen(false);
    setMenuAction('');
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const action = isActionDelete ? 'delete' : 'set-primary';

      const url = `/api/account/mobile?action=${action}`;

      const { data } = await axios.patch(url, { phone: targetNumber });

      refetch();
      setOpen(false);
      setIsSubmitting(false);

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
        keepMounted
        onKeyUp={(e) => {
          const ENTER = 'Enter';

          if (e.key === ENTER) {
            handleSubmit();
          }
        }}
      >
        <DialogTitle>
          {isActionDelete ? 'Delete Mobile Number' : 'Set Primary'}
        </DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <DialogContent>
          <DialogContentText
            sx={{ span: { color: 'var(--palette-light-blue)' } }}
          >
            {isActionDelete ? (
              <>
                This will delete <span>{targetNumber}</span> permanently. You
                cannot undo this action.
              </>
            ) : (
              <>
                This will set <span>{targetNumber}</span> as your primary mobile
                number.
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
