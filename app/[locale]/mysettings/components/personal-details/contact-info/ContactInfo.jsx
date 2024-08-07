import React, { useState } from 'react';
import { Grid, Typography, Box, Button } from '@mui/material';
import EmailAddresses from './email-addresses/EmailAddresses';
import MobileNumbers from './mobile-numbers/MobileNumbers';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/app/components/custom/texts';
import AddEmailForm from './email-addresses/AddEmailForm';
import VerifyEmailOTP from './email-addresses/VerifyEmailOTP';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AddMobileForm from './mobile-numbers/AddMobileForm';
import VerifyMobileOTP from './mobile-numbers/VerifyMobileOTP';

export default function ContactInfo() {
  const [openAddEmail, setOpenAddEmail] = useState(false);
  const [openAddMobile, setOpenAddMobile] = useState(false);
  const [openEmailOTP, setOpenEmailOTP] = useState(false);
  const [openMobileOTP, setOpenMobileOTP] = useState(false);
  const [email, setEmail] = useState('');
  const [completePhone, setCompletePhone] = useState({
    phone: {
      dialCode: '',
      phoneNumber: ''
    }
  });

  const { alert, handleClose } = useMessageStore();

  const handleClickAddEmail = () => {
    setOpenAddEmail(true);
  };
  const handleClickAddMobile = () => {
    setOpenAddMobile(true);
  };

  return (
    <>
      <Grid container spacing={5}>
        <Grid item xs={12} md={6}>
          <Typography variant="h5">My Email Addresses</Typography>
          <Typography>
            You can use the following email addresses to sign in to your
            account.
          </Typography>

          <Box sx={{ textAlign: 'right' }}>
            <Button
              size="small"
              variant="contained"
              startIcon={<EmailIcon />}
              onClick={handleClickAddEmail}
              sx={{ mt: 2 }}
            >
              Add Email
            </Button>
          </Box>

          <EmailAddresses />

          {openEmailOTP ? (
            <VerifyEmailOTP
              open={openEmailOTP}
              setOpenOTP={setOpenEmailOTP}
              email={email}
            />
          ) : (
            <AddEmailForm
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

          <Box sx={{ textAlign: 'right' }}>
            <Button
              size="small"
              variant="contained"
              startIcon={<PhoneIcon />}
              onClick={handleClickAddMobile}
              sx={{ mt: 2 }}
            >
              Add Mobile
            </Button>
          </Box>

          <MobileNumbers />

          {openMobileOTP ? (
            <VerifyMobileOTP
              open={openMobileOTP}
              setOpenOTP={setOpenMobileOTP}
              completePhone={completePhone}
            />
          ) : (
            <AddMobileForm
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
