import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

// internal imports
import {
  useUserDataContext,
  UserDetailsProvider,
  useUserSessionContext,
} from '@/contexts/UserProvider';
import CustomTab from '@/components/tabs/CustomTab';
import CustomError from '@/components/errors/CustomError';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import { profileSettingsTabComponents } from '@/config/componentMapping';

const titleMap = {
  0: 'Personal Details',
  1: 'Contact Information',
};

const subTitleMap = {
  0: "Update your info and find out how it's used.",
  1: 'Review and update your contact details to ensure seamless communication.',
};

const tabContent = [
  {
    icon: <PermIdentityIcon />,
    label: 'Personal Details',
  },
  {
    icon: <BadgeOutlinedIcon />,
    label: 'Contact Information',
  },
];

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
        <CustomTab
          value={value}
          setValue={setValue}
          ariaLabel="profile settings tabs"
          tabContent={tabContent}
          tabPanelComponents={profileSettingsTabComponents}
        />
      </UserDetailsProvider>
    </>
  );
};

const Profile = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">{titleMap[value]}</Typography>
        <Typography>{subTitleMap[value]}</Typography>
      </Box>

      <UserDetails value={value} setValue={setValue} />
    </>
  );
};

export default Profile;
