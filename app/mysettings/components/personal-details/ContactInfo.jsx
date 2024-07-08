import { Grid } from '@mui/material';
import EmailAddresses from './email-addresses/EmailAddresses';
import MobileNumbers from './mobile-numbers/MobileNumbers';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/app/components/custom/messages';

export default function ContactInfo() {
  const { alert, handleClose } = useMessageStore();

  return (
    <>
      <Grid container spacing={5}>
        <EmailAddresses />
        <MobileNumbers />
      </Grid>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
