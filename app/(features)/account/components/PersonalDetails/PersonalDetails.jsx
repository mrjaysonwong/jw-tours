import React, { useContext } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Typography, Divider, Box } from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// local imports
import { UserDataContext } from '@/contexts/UserProvider';
import UserDetailsGrid from './UserDetailsGrid';
import PhotoButtonSettings from './ProfilePhoto/PhotoButtonSettings';
import ContactInfo from './ContactInfo/ContactInfo';
import CustomError from '@/components/errors/500';
import { StyledDetailsBreadcrumbs } from '@/components/styled/StyledBreadrumbs';

export default function PersonalDetails() {
  const searchParams = useSearchParams();
  const isContactInfo = searchParams.get('q') === 'contact-info';

  const { isError, error } = useContext(UserDataContext);

  if (isError) {
    return <CustomError error={error} />;
  }

  return (
    <>
      <StyledDetailsBreadcrumbs
        contactinfo={`${isContactInfo}`}
        aria-label="breadcrumb"
        separator={<NavigateNextIcon fontSize="small" />}
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
      </StyledDetailsBreadcrumbs>

      <Divider sx={{ my: 3 }} />

      <Box
        sx={{
          display: isContactInfo ? 'none' : 'block',
        }}
      >
        <Typography variant="h5">Personal Details</Typography>
        <Typography>
          Update your info and find out how it&apos;s used.
        </Typography>
      </Box>

      <Box sx={{ display: isContactInfo ? 'none' : 'block' }}>
        <Box
          sx={{
            mt: 3,
            textAlign: 'right',
          }}
        >
          <PhotoButtonSettings />
        </Box>

        <UserDetailsGrid />
      </Box>

      <Box sx={{ display: isContactInfo ? 'block' : 'none' }}>
        <ContactInfo />
      </Box>
    </>
  );
}
