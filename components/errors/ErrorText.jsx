import { FormHelperText } from '@mui/material';

const ErrorText = ({ error }) => {
  return (
    error && (
      <FormHelperText error sx={{ fontSize: 16, mx: 0 }}>
        {error.message ?? error}
      </FormHelperText>
    )
  );
};

export default ErrorText;
