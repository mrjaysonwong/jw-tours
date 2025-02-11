import { Typography, Grid } from '@mui/material';
import KeyMetrics from './KeyMetrics';
import SalesChart from './SalesChart';
import WebsiteViewsChart from './WebsiteViewsChart';

export default function Overview() {
  return (
    <>
      <Typography variant="h5">Overview</Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <KeyMetrics />
        </Grid>

        <Grid item xs={12} lg={8}>
          <SalesChart />
        </Grid>

        <Grid item xs={12} lg={4}>
          <WebsiteViewsChart />
        </Grid>
      </Grid>
    </>
  );
}
