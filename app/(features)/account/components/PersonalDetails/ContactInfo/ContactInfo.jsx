import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';

// local imports
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/components/alerts/Alerts';
import EmailAddresses from './EmailAddresses';
import MobileNumbers from './MobileNumbers';
import AddEmailDialog from './AddEmailDialog';
import OTPDialog from '@/components/dialogs/OTPDialog';
import AddMobileDialog from './AddMobileDialog';


export default function ContactInfo() {
  const [isAddEmailOpen, setAddEmailOpen] = useState(false);
  const [isAddMobileOpen, setAddMobileOpen] = useState(false);
  const [isEmailOTPOpen, setEmailOTPOpen] = useState(false);
  const [isMobileOTPOpen, setMobileOTPOpen] = useState(false);

  const [email, setEmail] = useState('');

  const [completePhone, setCompletePhone] = useState({
    phone: {
      dialCode: '',
      phoneNumber: '',
    },
  });

  const { alert, handleClose } = useMessageStore();

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">My Email Addresses</Typography>
          <Typography>
            You can use the following email addresses to sign in to your
            account.
          </Typography>

          <EmailAddresses setOpen={setAddEmailOpen} />

          {isEmailOTPOpen ? (
            <OTPDialog
              open={isEmailOTPOpen}
              setOpenOTP={setEmailOTPOpen}
              email={email}
              type="email"
            />
          ) : (
            <AddEmailDialog
              open={isAddEmailOpen}
              setOpen={setAddEmailOpen}
              setOpenOTP={setEmailOTPOpen}
              setEmail={setEmail}
            />
          )}
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h5">My Mobile Numbers</Typography>
          <Typography>
            View and manage all of the mobile numbers associated with your
            account.
          </Typography>

          <MobileNumbers setOpen={setAddMobileOpen} />

          {isMobileOTPOpen ? (
            <OTPDialog
              open={isMobileOTPOpen}
              setOpenOTP={setMobileOTPOpen}
              completePhone={completePhone}
              type="mobile"
            />
          ) : (
            <AddMobileDialog
              open={isAddMobileOpen}
              setOpen={setAddMobileOpen}
              setOpenOTP={setMobileOTPOpen}
              setCompletePhone={setCompletePhone}
            />
          )}
        </Grid>
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
