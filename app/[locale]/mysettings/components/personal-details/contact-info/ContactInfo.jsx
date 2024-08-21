import React, { useState } from 'react';
import { Grid, Typography } from '@mui/material';
import EmailAddresses from './email-addresses/EmailAddresses';
import MobileNumbers from './mobile-numbers/MobileNumbers';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/app/components/custom/texts';
import AddEmailDialog from './email-addresses/AddEmailDialog';
import VerifyEmailOTPDialog from './email-addresses/VerifyEmailOTPDialog';
import AddMobileDialog from './mobile-numbers/AddMobileDialog';
import VerifyMobileOTPDialog from './mobile-numbers/VerifyMobileOTPDialog';

export default function ContactInfo() {
  const [openAddEmail, setOpenAddEmail] = useState(false);
  const [openAddMobile, setOpenAddMobile] = useState(false);
  const [openEmailOTP, setOpenEmailOTP] = useState(false);
  const [openMobileOTP, setOpenMobileOTP] = useState(false);

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

          <EmailAddresses setOpen={setOpenAddEmail} />

          {openEmailOTP ? (
            <VerifyEmailOTPDialog
              open={openEmailOTP}
              setOpenOTP={setOpenEmailOTP}
              email={email}
            />
          ) : (
            <AddEmailDialog
              open={openAddEmail}
              setOpen={setOpenAddEmail}
              setOpenOTP={setOpenEmailOTP}
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

          <MobileNumbers setOpen={setOpenAddMobile} />

          {openMobileOTP ? (
            <VerifyMobileOTPDialog
              open={openMobileOTP}
              setOpenOTP={setOpenMobileOTP}
              completePhone={completePhone}
            />
          ) : (
            <AddMobileDialog
              open={openAddMobile}
              setOpen={setOpenAddMobile}
              setOpenOTP={setOpenMobileOTP}
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
