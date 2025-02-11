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

const cardList = () => {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 4 }).map((e, index) => (
        <Grid key={index} item xs={12} sm={6} lg={3}>
          <Card>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: 'black', borderRadius: '24px' }}>
                  <StyleIcon sx={{ color: 'white' }} />
                </Avatar>
              }
              title={<Typography sx={{ fontWeight: 450 }}>Bookings</Typography>}
              subheader={
                <Typography sx={{ fontSize: '1.5rem' }}>281</Typography>
              }
              sx={{ textAlign: 'right' }}
            />
            <Divider />
            <CardContent>
              <Typography variant="body2">
                <span style={{ color: 'var(--color-positive)' }}>+55%</span>{' '}
                than lask week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default function KeyMetrics() {
  return <>{cardList()}</>;
}
