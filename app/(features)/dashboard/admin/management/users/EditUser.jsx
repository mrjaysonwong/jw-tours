// third-party imports
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Typography } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

// internal imports
import { useAdminUserData } from '@/hooks/useUserData';
import { UserDetailsProvider } from '@/contexts/UserProvider';
import CustomTab from '@/components/tabs/CustomTab';
import { adminEditUserTabComponents } from '@/config/componentMapping';
import CustomError from '@/components/errors/CustomError';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';

const tabContent = [
  {
    icon: <PermIdentityIcon />,
    label: 'Personal Details',
  },
  {
    icon: <BadgeOutlinedIcon />,
    label: 'Contact Information',
  },
  {
    icon: <LockOutlinedIcon />,
    label: 'Security',
  },
];

const UserDetails = () => {
  const [value, setValue] = useState(0);
  const params = useParams();

  const {
    data: user,
    isLoading,
    refetch,
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
    refetch,
  };

  return (
    <>
      <UserDetailsProvider value={contextValues}>
        <CustomTab
          value={value}
          setValue={setValue}
          ariaLabel="edit user tabs"
          tabContent={tabContent}
          tabPanelComponents={adminEditUserTabComponents}
        />
      </UserDetailsProvider>
    </>
  );
};

const EditUser = () => {
  return (
    <>
      <Typography variant="h5">Edit</Typography>

      <UserDetails />
    </>
  );
};

export default EditUser;
