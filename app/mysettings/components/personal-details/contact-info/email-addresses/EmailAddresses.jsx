import { useContext, useState } from 'react';
import {
  Typography,
  Box,
  Card,
  Grid,
  Skeleton,
  Button,
  Tooltip,
} from '@mui/material';
import { PersonalSettingsContext } from '../../PersonalDetails';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import EmailMenu from './EmailMenu';
import AddEmailForm from './AddEmailForm';
import VerifyEmailOTP from './VerifyEmailOTP';

export default function EmailAddresses() {
  const { user, isLoading } = useContext(PersonalSettingsContext);

  const [open, setOpen] = useState(false);
  const [openOTP, setOpenOTP] = useState(false);
  const [email, setEmail] = useState('');

  const primaryEmail = user?.email.find((e) => e.isPrimary === true);

  const sortedEmailList = user?.email
    .slice()
    .sort((a, b) => b.isPrimary - a.isPrimary);

  const emailListCard = sortedEmailList?.map((e) => {
    return (
      <Box key={e.email} sx={{ position: 'relative' }}>
        <Card
          sx={{
            py: 2,
            pl: 3,
            pr: 7,
            my: 4,
          }}
        >
          <Typography sx={{ overflow: 'auto', userSelect: 'all' }}>
            {primaryEmail.email}
          </Typography>
        </Card>

        <EmailMenu primaryEmail={primaryEmail} />

        {primaryEmail && (
          <Tooltip title="Primary Email Address" arrow placement="right-end">
            <Box sx={{ position: 'absolute', top: -5 }}>
              <WorkspacePremiumIcon color="primary" />
            </Box>
          </Tooltip>
        )}
      </Box>
    );
  });

  const handleClickAdd = () => {
    setOpen(true);
  };

  return (
    <>
      <Grid item xs={12} md={6}>
        <Typography variant="h5">My Email Addresses</Typography>
        <Typography>
          You can use the following email addresses to sign in to your account.
        </Typography>

        <Box sx={{ textAlign: 'right', my: 2 }}>
          <Button size="small" variant="contained" onClick={handleClickAdd}>
            Add Email
          </Button>
        </Box>

        {isLoading ? <Skeleton height={80} /> : emailListCard}
      </Grid>

      {openOTP ? (
        <VerifyEmailOTP open={openOTP} setOpen={setOpenOTP} email={email} />
      ) : (
        <AddEmailForm
          open={open}
          setOpen={setOpen}
          setOpenOTP={setOpenOTP}
          setEmail={setEmail}
        />
      )}
    </>
  );
}
