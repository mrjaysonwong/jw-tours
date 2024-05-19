'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Tabs, Tab, Button } from '@mui/material';
import { accountSettingsRoutes } from '@/src/routes/account-settings-routes';
import PersonalDetails from '../personal-details/PersonalDetails';
import Preferences from '../preferences/Preferences';
import Security from '../security/Security';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
        ml: { xs: 0, lg: 3 },
      }}
    >
      {value === index && <Box sx={{ mt: { xs: 0, lg: 5 } }}>{children}</Box>}
    </Box>
  );
}

export default function MySettingsTabs({ slug }) {
  const currentIndex = accountSettingsRoutes.findIndex(
    (item) => item.slug === slug
  );

  const [value, setValue] = useState(currentIndex);

  const router = useRouter();

  const handleChange = (event, newValue) => {
    const newSlug = accountSettingsRoutes[newValue].slug;
    setValue(newValue);
    router.replace(`/mysettings/${newSlug}`);
  };

  return (
    <>
      <Link href="/mysettings" replace>
        <Button
          startIcon={<ArrowBackIcon />}
          sx={{
            display: { lg: 'none' },
            my: 3,
          }}
        >
          Go Back
        </Button>
      </Link>

      <Box sx={{ display: { xs: 'block', lg: 'flex' } }}>
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
          {accountSettingsRoutes.map((item) => (
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

        {accountSettingsRoutes.map((item, index) => (
          <TabPanel key={item.tabName} value={value} index={index}>
            {index === 0 && <PersonalDetails />}
            {index === 1 && <Preferences />}
            {index === 2 && <Security />}
          </TabPanel>
        ))}
      </Box>
    </>
  );
}
