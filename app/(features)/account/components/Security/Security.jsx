import { Typography, Divider } from '@mui/material';

// local imports
import Password from './Password';
import DeleteAccount from './DeleteAccount';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/components/alerts/Alerts';

export default function Security() {
  const { alert, handleClose } = useMessageStore();

  return (
    <>
      <Typography variant="h5">Security</Typography>
      <Typography>
        Change your security settings, or delete your account.
      </Typography>

      <Divider sx={{ my: 3 }} />

      <Password />

      <DeleteAccount />

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
