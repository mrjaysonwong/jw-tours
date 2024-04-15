import { forwardRef } from 'react';
import { Alert as MuiAlert, Snackbar, Typography } from '@mui/material';

export const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert {...props} ref={ref} elevation={2} variant="filled" />;
});

export const AlertMessage = ({ open, onClose, message, severity }) => {
  const ariaAttributes = {
    'aria-live': 'assertive',
    'aria-atomic': 'true',
    role: 'alert',
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        autoHideDuration={5000}
        onClose={onClose}
      >
        <Alert onClose={onClose} severity={severity} {...ariaAttributes}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export const FieldErrorMessage = ({ error }) =>
  error && (
    <Typography color="error" className="error">
      {error.message}
    </Typography>
  );
