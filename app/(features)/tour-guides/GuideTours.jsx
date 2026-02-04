import Link from 'next/link';
import { Typography, Box, Grid, Card } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';

// internal imports
import { formatUrl } from '@/utils/formats/common';
import { useGuideData } from '@/contexts/GuideProfileProvider';

const GuideTours = () => {
  const { name, tours } = useGuideData();

  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="h6" sx={{ my: 1 }}>
        Tours by <span style={{ textTransform: 'capitalize' }}>{name}.</span>
      </Typography>

      {tours.length === 0 ? (
        <Typography>No hosted tours yet</Typography>
      ) : (
        <Grid container spacing={2}>
          {tours.map((tour) => {
            const href = `/tours/${formatUrl(tour.geoLocation)}/${formatUrl(
              tour.destination.name
            )}/${tour._id}`;

            return (
              <Grid key={tour._id} item xs={6} sm={4} lg={2}>
                <Link href={href} target="_blank">
                  <Card
                    sx={{
                      textAlign: 'center',
                      textTransform: 'capitalize',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    <PlaceOutlinedIcon sx={{ mr: 1 }} />
                    <Typography color="inherit">
                      {tour.destination.name}
                    </Typography>
                  </Card>
                </Link>
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default GuideTours;
