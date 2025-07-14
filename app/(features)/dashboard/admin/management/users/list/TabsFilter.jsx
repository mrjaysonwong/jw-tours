import React from 'react';
import { Tabs, Tab, Typography, Box } from '@mui/material';

import { statusLabelColorMap } from '@/constants/statusColorMaps';

const tabLabels = ['all', 'active', 'pending', 'suspended', 'inactive'];

const TabsFilter = ({ value, handleChangeTab, users }) => {
  return (
    <Box
      sx={{
        borderBottom: 1,
        borderColor: 'divider',
      }}
    >
      <Tabs
        variant="scrollable"
        value={value}
        onChange={handleChangeTab}
        aria-label="scrollable status filter tabs"
      >
        {tabLabels.map((label, index) => {
          const statusCount =
            label === 'all'
              ? users.length
              : users.filter((user) => user.status === label).length;

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
                    {statusCount}
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

export default React.memo(TabsFilter);
