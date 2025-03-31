import React from 'react';
import { Typography, Grid } from '@mui/material';

// internal imports
import { formatISOlong } from '@/utils/formats/formatDates';
import KeyMetrics from './KeyMetrics';

const NotificationsReport = () => {
  return (
    <>
      <Typography variant="h5">Notifications Reports</Typography>

      <Typography>Today&apos;s Notifications</Typography>
      <Typography variant="body2" sx={{ color: 'gray' }}>
        {formatISOlong(Date.now())}
      </Typography>

      <Grid container spacing={2} sx={{ my: 2 }}>
        <Grid item xs={12}>
          <KeyMetrics />
        </Grid>
      </Grid>
    </>
  );
};

export default NotificationsReport;
