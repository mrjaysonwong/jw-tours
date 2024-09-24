import { forwardRef } from 'react';
import { Alert as MuiAlert, Snackbar } from '@mui/material';

export const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert {...props} ref={ref} elevation={2} variant="filled" />;
});

export const AlertMessage = (props) => {
  const { open, onClose, message, severity, x = 'left', y = 'bottom' } = props;

  const ariaAttributes = {
    'aria-live': 'assertive',
    'aria-atomic': 'true',
    role: 'alert',
  };

  return (
    <>
      <Snackbar
        open={open}
        anchorOrigin={{ horizontal: x, vertical: y }}
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
