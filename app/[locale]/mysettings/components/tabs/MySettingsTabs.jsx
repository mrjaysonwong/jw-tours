'use client';

import React, { useState, createContext, useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { accountSettingsLinks } from '@/src/navigation-links/accountSettingsLinks';
import PersonalDetails from '../personal-details/PersonalDetails';
import { UserSessionContext } from '@/context/UserSessionWrapper';
import { useUserData } from '@/utils/hooks/useUserData';
import Preferences from '../preferences/Preferences';
import Security from '../security/Security';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const PersonalSettingsContext = createContext(null);

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      sx={{
        width: '100%',
        minHeight: '75vh',
        ml: { xs: 0, lg: 3 },
      }}
    >
      {value === index && <Box sx={{ mt: { xs: 0, lg: 5 } }}>{children}</Box>}
    </Box>
  );
}

export default function MySettingsTabs({ slug }) {
  const currentIndex = accountSettingsLinks.findIndex(
    (item) => item.slug === slug
  );

  const session = useContext(UserSessionContext);
  const {id: userId, email} = session?.user


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
    email,
    refetch,
    isError,
    error,
  };

  const [value, setValue] = useState(currentIndex);

  const router = useRouter();

  const handleChange = (event, newValue) => {
    const newSlug = accountSettingsLinks[newValue].slug;
    setValue(newValue);
    router.replace(`/mysettings/${newSlug}`);
  };

  return (
    <>
      <Box
        sx={{
          a: {
            color: 'primary.main',
          },
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            display: { lg: 'none' },
            mb: 3,
          }}
        >
          <Link href="/mysettings" replace>
            Go Back
          </Link>
        </Button>
      </Box>

      <Box sx={{ width: '100%', display: { xs: 'block', lg: 'flex' } }}>
        <Tabs
          orientation="vertical"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable tabs"
          sx={{
            width: '300px',
            height: '80vh',
            display: { xs: 'none', lg: 'flex' },
          }}
        >
          {accountSettingsLinks.map((item) => (
            <Tab
              key={item.tabName}
              disableRipple
              icon={item.icon}
              iconPosition="start"
              label={item.tabName}
              sx={{
                textTransform: 'none',
                display: 'flex',
                justifyContent: 'flex-start',
                borderRight: 1,
                borderBottom: 1,
                borderLeft: 1,
                borderColor: 'divider',
                '&:first-child': {
                  borderTop: 1,
                  borderColor: 'divider',
                },
              }}
            />
          ))}
        </Tabs>

        <PersonalSettingsContext.Provider value={values}>
          {accountSettingsLinks.map((item, index) => (
            <TabPanel key={item.tabName} value={value} index={index}>
              {index === 0 && <PersonalDetails />}
              {index === 1 && <Preferences />}
              {index === 2 && <Security />}
            </TabPanel>
          ))}
        </PersonalSettingsContext.Provider>
      </Box>
    </>
  );
}
