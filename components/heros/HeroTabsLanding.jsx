'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box, Tab, useTheme } from '@mui/material';

// internal imports
import { StyledHeroTabs } from '../styled/StyledTabs';
import { StyledHeroOverlay } from '../styled/StyledOverlays';
import { heroTabComponents } from '@/constants/componentMaps/componentMaps';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`hero-tabpanel-${index}`}
      aria-labelledby={`hero-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
};

const HeroTabsLanding = ({ data }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const tab = searchParams.get('tab');
  const id = searchParams.get('id');

  const [value, setValue] = useState(0 || +id);

  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';

  const handleChange = (event, newValue) => {
    setValue(newValue);

    const { label } = data[newValue];
    const tabLabel = label.toLowerCase();

    if (tabLabel) {
      router.replace(`/?tab=${tabLabel}&id=${newValue}`);
    }
  };

  const tabLabel = useMemo(() => {
    const { label } = data[0 || +id];
    return label.toLowerCase();
  }, [data, id]);

  useEffect(() => {
    if (tab !== tabLabel) {
      router.replace('/');
    }

    setValue(+id);
  }, [tabLabel, tab, id, router]);

  return (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        mt: '4rem',
      }}
    >
      {data.map((item, index) => {
        const TabComponent = heroTabComponents[index];
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
