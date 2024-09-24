'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Box, Tabs, Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// local imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import { StyledMySettingsTab } from '@/components/styled/StyledTabs';
import { accountSettingsLinks } from '@/data/links/accountSettingsLinks';
import { UserDataProvider } from '@/contexts/UserProvider';
import PersonalDetails from './PersonalDetails/PersonalDetails';
import Preferences from './Preferences/Preferences';
import Security from './Security/Security';
import PaymentDetails from './PaymentDetails/PaymentDetails';

const tabComponents = [PersonalDetails, Preferences, Security, PaymentDetails];

const TabPanel = (props) => {
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
};

export default function MySettingsTabs({ slug }) {
  const currentIndex = accountSettingsLinks.findIndex(
    (item) => item.slug === slug
  );

  const [value, setValue] = useState(currentIndex);
  const router = useRouter();

  const handleChange = (event, newValue) => {
    const newSlug = accountSettingsLinks[newValue].slug;
    setValue(newValue);
    router.replace(`/mysettings/${newSlug}`);
  };

  return (
    <StyledContainer>
      <Box>
        <Link href="/mysettings">
          <Button
            startIcon={<ArrowBackIcon />}
            sx={{
              display: { lg: 'none' },
              mb: 3,
            }}
          >
            Go Back
          </Button>
        </Link>
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
          {accountSettingsLinks.map((item, index) => (
            <StyledMySettingsTab
              key={index}
              disableRipple
              icon={item.icon}
              iconPosition="start"
              label={item.tabName}
            />
          ))}
        </Tabs>

        <UserDataProvider>
          {accountSettingsLinks.map((e, index) => {
            const TabComponent = tabComponents[index];

            return (
              <TabPanel key={index} value={value} index={index}>
                {TabComponent && <TabComponent />}
              </TabPanel>
            );
          })}
        </UserDataProvider>
      </Box>
    </StyledContainer>
  );
}
