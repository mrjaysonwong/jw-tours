import { Alert as MuiAlert, Snackbar, Typography } from '@mui/material';

export const FieldErrorMessage = ({ error }) =>
  error && (
    <Typography color="error" className="error">
      {error.message}
    </Typography>
  );
