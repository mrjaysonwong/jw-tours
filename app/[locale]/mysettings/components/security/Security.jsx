import React, { useContext } from 'react';
import { Typography, Divider } from '@mui/material';
import Password from './components/Password';
import DeleteAccount from './components/DeleteAccount';
import { PersonalSettingsContext } from '../tabs/MySettingsTabs';
import { LoadingSkeletonCard } from '@/app/components/custom/loaders/Skeleton';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/app/components/custom/texts';


export default function Security() {
  const { isLoading } = useContext(PersonalSettingsContext);

  const { alert, handleClose } = useMessageStore();

  return (
    <>
      <Typography variant="h5">Security</Typography>
      <Typography>
        Change your security settings, or delete your account.
      </Typography>

      <Divider sx={{ my: 3 }} />

      {isLoading ? (
        <LoadingSkeletonCard h={106} />
      ) : (
        <>
          <Password />
          <DeleteAccount />
        </>
      )}

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
