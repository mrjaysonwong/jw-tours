import React, { useContext, createContext } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Typography, Divider, Box, Breadcrumbs } from '@mui/material';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { useUserData } from '@/utils/hooks/useUserData';
import DetailsGrid from './details-grid/DetailsGrid';
import ProfilePhoto from './profile-photo/ProfilePhoto';
import CustomError from '@/app/components/custom/error';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ContactInfo from './contact-info/ContactInfo';

export const PersonalSettingsContext = createContext(null);

export default function PersonalDetails() {
  const session = useContext(UserSessionContext);
  const userId = session?.user?.id;

  const searchParams = useSearchParams();
  const isContactInfo = searchParams.get('q') === 'contact-info';

  const {
    data: user,
    isLoading,
    refetch,
    isError,
    error,
  } = useUserData(userId);

  const values = {
    user,
    isLoading,
    userId,
    refetch,
  };

  if (isError) {
    return <CustomError />;
  }

  return (
    <>
      <PersonalSettingsContext.Provider value={values}>
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={<NavigateNextIcon fontSize="small" />}
          sx={{
            mb: 2,
            '.personal': {
              color: !isContactInfo ? 'var(--palette-orange)' : 'inherit',
              ':hover': {
                textDecoration: 'underline',
              },
            },
            '.contact-info': {
              color: isContactInfo ? 'var(--palette-orange)' : 'inherit',
              ':hover': {
                textDecoration: 'underline',
              },
            },
          }}
        >
          <Link
            className="personal"
            href="/mysettings/personal"
            aria-current={!isContactInfo ? 'page' : false}
          >
            Personal details
          </Link>

          <Link
            className="contact-info"
            href="/mysettings/personal?q=contact-info"
            aria-current={isContactInfo ? 'page' : false}
          >
            Contact info
          </Link>
        </Breadcrumbs>

        <Box
          sx={{
            display: isContactInfo ? 'none' : 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h5">Personal details</Typography>
            <Typography>
              Update your info and find out how it&apos;s used.
            </Typography>
          </Box>

          <ProfilePhoto />

        </Box>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ display: isContactInfo ? 'none' : 'block' }}>
          <DetailsGrid />
        </Box>

        <Box sx={{ display: isContactInfo ? 'flex' : 'none' }}>
          <ContactInfo />
        </Box>
      </PersonalSettingsContext.Provider>
    </>
  );
}
