'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Tab, useTheme } from '@mui/material';

// internal imports
import { StyledHeroTabs } from '../styled/StyledTabs';
import { StyledHeroOverlay } from '../styled/StyledOverlays';
import {
  TabPanelOne,
  TabPanelTwo,
  TabPanelThree,
  TabPanelFour,
  TabPanelFive,
} from './index';

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

const HeroTabsLanding = ({ data }) => {
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

  const tabLabel = useMemo(() => {
    const { label } = data[0 || +aid];
    return label.toLowerCase();
  }, [data, aid]);

  useEffect(() => {
    if (selectedTab !== tabLabel) {
      router.replace('/');
    }

    setValue(+aid);
  }, [tabLabel, selectedTab, aid, router]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        mt: '4rem',
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
                      ? 'var(--color-dark-main)'
                      : 'var(--color-light-main)'
                    : 'inherit',
                color:
                  value === index &&
                  !isDarkMode &&
                  'var(--color-dark-main) !important',
              }}
            />
          ))}
        </StyledHeroTabs>
      </Box>

      <StyledHeroOverlay />
    </Box>
  );
};

export default HeroTabsLanding;
