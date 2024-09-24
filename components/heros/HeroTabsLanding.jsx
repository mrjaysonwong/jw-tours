'use client';

import React, { useState, useEffect, useContext } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Typography,
  Box,
  Grid,
  Container,
  TextField,
  Paper,
  Tabs,
  Tab,
  useTheme,
} from '@mui/material';

// local imports
import { StyledHeroTabs } from '../styled/StyledTabs';
import { StyledHeroOverlay } from '../styled/StyledOverlays';
import TabPanelOne from './TabPanelOne';
import TabPanelTwo from './TabPanelTwo';
import TabPanelThree from './TabPanelThree';
import TabPanelFour from './TabPanelFour';
import TabPanelFive from './TabPanelFive';

const tabComponents = [
  TabPanelOne,
  TabPanelTwo,
  TabPanelThree,
  TabPanelFour,
  TabPanelFive,
];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

export default function HeroTabsLanding({ data }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedTab = searchParams.get('selectedTab');
  const aid = searchParams.get('aid');

  const [value, setValue] = useState(0 || +aid);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleChange = (event, newValue) => {
    setValue(newValue);

    const { label } = data[newValue];
    const tabLabel = label.toLowerCase();

    if (tabLabel) {
      router.replace(`/?selectedTab=${tabLabel}&aid=${newValue}`);
    }
  };

  useEffect(() => {
    const { label } = data[+aid || 0];
    const tabLabel = label.toLowerCase();

    if (selectedTab !== tabLabel) {
      router.replace('/');
    }

    setValue(+aid);
  }, [searchParams]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
      }}
    >
      {data.map((item, index) => {
        const TabComponent = tabComponents[index];
        return (
          <TabPanel key={index} value={value} index={index}>
            <TabComponent item={item} />
          </TabPanel>
        );
      })}

      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <StyledHeroTabs
          textColor="inherit"
          indicatorColor="none"
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
          aria-label="scrollable auto tabs"
        >
          {data.map((item, index) => (
            <Tab
              key={index}
              disableRipple
              icon={item.icon}
              iconPosition="start"
              label={item.label}
              sx={{
                bgcolor:
                  value === index
                    ? isDarkMode
                      ? '#141414'
                      : '#f5f5f5'
                    : 'inherit',
                color: value === index && !isDarkMode && '#141414 !important',
              }}
            />
          ))}
        </StyledHeroTabs>
      </Box>

      <StyledHeroOverlay />
    </Box>
  );
}
