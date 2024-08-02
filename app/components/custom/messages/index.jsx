import { forwardRef } from 'react';
import { Alert as MuiAlert, Snackbar, Typography } from '@mui/material';

export const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert {...props} ref={ref} elevation={2} variant="filled" />;
});

export const AlertMessage = (props) => {
  const { open, onClose, message, severity } = props;

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
        <Alert
          onClose={onClose}
          severity={severity}
          {...ariaAttributes}
          sx={{ color: 'white' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export const FieldErrorMessage = ({ error }) =>
  error && (
    <Typography color="error" className="error" variant="body2">
      {error.message}
    </Typography>
  );
