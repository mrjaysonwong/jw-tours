import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';

// internal imports
import {
  useUserDataContext,
  UserDetailsProvider,
  useUserSessionContext,
} from '@/contexts/UserProvider';
import CustomTab from '@/components/tabs/CustomTab';
import { useMessageStore } from '@/stores/messageStore';
import AlertMessage from '@/components/alerts/AlertMessage';
import CustomError from '@/components/errors/CustomError';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

const TITLES = {
  0: 'Personal Details',
  1: 'Contact Information',
};

const SUBTITLES = {
  0: "Update your info and find out how it's used.",
  1: 'Review and update your contact details to ensure seamless communication.',
};

const UserDetails = ({ value, setValue }) => {
  const session = useUserSessionContext();
  const sessionUserId = session?.user?.id;

  const { user, isLoading, refetch, isError, error } = useUserDataContext();

  if (isError) return <CustomError error={error} />;

  if (isLoading) return <LoadingSpinner h="50dvh" />;

  const contextValues = {
    isLoading,
    userId: sessionUserId,
    user,
    isError,
    error,
    refetch,
  };

  return (
    <>
      <UserDetailsProvider value={contextValues}>
        <CustomTab value={value} setValue={setValue} />
      </UserDetailsProvider>
    </>
  );
};

const Profile = () => {
  const [value, setValue] = useState(0);
  const { alert, handleClose } = useMessageStore();

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">{TITLES[value]}</Typography>
        <Typography>{SUBTITLES[value]}</Typography>
      </Box>

      <UserDetails value={value} setValue={setValue} />

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
};

export default Profile;
