import { FormHelperText } from '@mui/material';

export const ErrorText = ({ error }) => {
  return (
    <FormHelperText error sx={{ fontSize: 16 }}>
      {error.message ?? error}
    </FormHelperText>
  );
};
