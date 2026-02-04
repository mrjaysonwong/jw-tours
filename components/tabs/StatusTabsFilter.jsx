import React, { useEffect } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { Tabs, Tab, Typography, Box } from '@mui/material';

// internal imports
import { statusLabelColorMap } from '@/constants/statusColorMaps';
import { useTableToolbarContext } from '@/contexts/TableToolbarProvider';

const StatusTabsFilter = ({ tabLabelsMap }) => {
  const { statusCount, tabParam } = useTableToolbarContext();
  const tabLabels = Object.keys(tabLabelsMap);

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeTab = (event, newValue) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set('tab', tabLabels[newValue]);
    if (newValue === 0) queryParams.delete('tab');

    queryParams.delete('page');
    queryParams.delete('limit');
    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  useEffect(() => {
    if (tabLabels && !tabLabels.includes(tabParam)) {
      const queryParams = new URLSearchParams(searchParams);
      queryParams.delete('tab');
      router.replace(`${pathname}?${queryParams.toString()}`);
    }
  }, [tabParam, pathname, searchParams, router, tabLabels]);

  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
        mb: 0.5,
      }}
    >
      <Tabs
        variant="scrollable"
        value={tabLabelsMap[tabParam] ?? 0}
        onChange={handleChangeTab}
        aria-label="scrollable status filter tabs"
      >
        {tabLabels.map((label) => {
          const count = statusCount[label] ?? 0;
          const statusColor = statusLabelColorMap[label];

          return (
            <Tab
              key={label}
              tabIndex={0}
              label={
                <Typography sx={{ textTransform: 'capitalize' }}>
                  {label}
                  <Box
                    component="span"
                    sx={{
                      ml: '8px',
                      bgcolor: statusColor.alphaColor,
                      color: statusColor.color,
                      px: 1,
                      py: 0.5,
                      fontSize: '14px',
                      fontWeight: 550,
                      borderRadius: '3px',
                    }}
                  >
                    {count}
                  </Box>
                </Typography>
              }
            />
          );
        })}
      </Tabs>
    </Box>
  );
};

export default React.memo(StatusTabsFilter);
