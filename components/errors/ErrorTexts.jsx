import { FormHelperText } from '@mui/material';

export const ErrorText = ({ error }) => {
  return (
    error && (
      <FormHelperText error sx={{ fontSize: 16 }}>
        {error.message ?? error}
      </FormHelperText>
    )
  );
};
