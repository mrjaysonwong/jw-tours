// third-party imports
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Typography } from '@mui/material';

// internal imports
import { useAdminUserData } from '@/hooks/useUserData';
import { UserDetailsProvider } from '@/contexts/UserProvider';
import CustomTab from '@/components/tabs/CustomTab';
import { useMessageStore } from '@/stores/messageStore';
import AlertMessage from '@/components/alerts/AlertMessage';
import CustomError from '@/components/errors/CustomError';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

const UserDetails = () => {
  const [value, setValue] = useState(0);
  const params = useParams();

  const {
    data: user,
    isLoading,
    adminRefetch,
    isError,
    error,
  } = useAdminUserData(params.id);

  if (isError) return <CustomError error={error} h="60dvh" />;

  if (isLoading) return <LoadingSpinner h="60dvh" />;

  const primaryEmail = user?.email[0].email;

  const contextValues = {
    isLoading,
    userId: params.id,
    user,
    email: primaryEmail,
    isError,
    error,
    adminRefetch,
  };

  return (
    <>
      <UserDetailsProvider value={contextValues}>
        <CustomTab value={value} setValue={setValue} />
      </UserDetailsProvider>
    </>
  );
};

const EditUser = () => {
  const { alert, handleClose } = useMessageStore();

  return (
    <>
      <Typography variant="h5">Edit User</Typography>

      <UserDetails />

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
};

export default EditUser;
