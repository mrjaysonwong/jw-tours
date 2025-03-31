import { forwardRef } from 'react';
import { Alert as MuiAlert, Snackbar, AlertTitle } from '@mui/material';

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert {...props} ref={ref} elevation={2} variant="filled" />;
});

const AlertMessage = ({
  open,
  onClose,
  message,
  severity,
  x = 'left', 
  y = 'bottom',
  title,
  duration = 4000,
}) => {
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
        autoHideDuration={duration}
        onClose={onClose}
      >
        <Alert
          onClose={onClose}
          severity={severity}
          {...ariaAttributes}
          sx={{ color: 'white' }}
        >
          {severity === 'info' && <AlertTitle>{title}</AlertTitle>}
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AlertMessage;
