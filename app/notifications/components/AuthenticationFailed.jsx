import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function AuthenticationFailed() {
  return (
    <>
      <ErrorIcon color="error" sx={{ fontSize: '4rem' }} />
      <Typography variant="h4" sx={{ m: 2, fontWeight: 500 }}>
        Authentication Failed
      </Typography>
      <Typography>
        It looks like you may have clicked on an invalid email verification
        link.
      </Typography>
      <Typography>
        Please close this window and try authenticating again.
      </Typography>
    </>
  );
}
