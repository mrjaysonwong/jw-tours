import { Typography } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function AuthenticationFailed({ t1 }) {
  return (
    <>
      <ErrorIcon color="error" sx={{ fontSize: '4rem' }} />
      <Typography variant="h4" sx={{ m: 2, fontWeight: 500 }}>
        {t1('headers.auth_failed')}
      </Typography>
      <Typography>{t1('paragraphs.invalid_verification_link')}</Typography>
      <Typography>{t1('subheaders.try_auth_again')}</Typography>
    </>
  );
}
