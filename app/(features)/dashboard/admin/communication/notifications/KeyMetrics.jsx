import {
  Card,
  CardHeader,
  Avatar,
  Typography,
  Grid,
  CardContent,
  Divider,
} from '@mui/material';
import StyleIcon from '@mui/icons-material/Style';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import { notificationsMetrics } from '@/data/keyMetricsData';

const CardList = () => {
  return (
    <Grid container columnSpacing={6} rowSpacing={2}>
      {notificationsMetrics.map((e, index) => (
        <Grid key={index} item xs={12} sm={6} lg={3}>
          <Card sx={{ bgcolor: e.color }}>
            <CardHeader
              avatar={
                <Avatar
                  sx={{
                    bgcolor: 'transparent',
                    p: 4,
                    borderRadius: '50%',
                    color: 'white',

                    '& svg': {
                      fontSize: '2.5rem',
                    },
                  }}
                >
                  {e.icon}
                </Avatar>
              }
              title={
                <Typography sx={{ fontWeight: 500 }}>{e.label}</Typography>
              }
              subheader={
                <Typography sx={{ fontSize: '1.5rem' }}>281</Typography>
              }
              sx={{ textAlign: 'right' }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default function KeyMetrics() {
  return <CardList />;
}
