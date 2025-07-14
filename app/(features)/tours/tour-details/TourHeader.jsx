import { Typography, Box, Rating } from '@mui/material';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import VerifiedIcon from '@mui/icons-material/Verified';
import { useTourDetails } from '@/contexts/TourContextProvider';

const TourHeader = () => {
  const { tour } = useTourDetails();
  const { reviewCount, avgRating } = tour.reviewSummary;

  return (
    <>
      <Typography
        sx={{
          fontSize: 'clamp(1rem, 5vw + 0.5rem, 2rem)',
          fontWeight: 550,
          textTransform: 'capitalize',
          background: '-webkit-linear-gradient(20deg, #27AF60, #1CA085)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {tour.title}
      </Typography>
      <Typography variant="body2" color="gray">
        Tour #{tour.tourId}
      </Typography>

      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 2,

          '& > *': {
            py: 0.5,
          },

          '& p:not(:first-child)': {
            fontSize: { xs: '0.9rem', md: '0.8rem' },
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Rating
            name="half-rating-read"
            defaultValue={avgRating}
            precision={0.5}
            readOnly
            sx={{ color: '#FCC737' }}
          />
          <Typography
            component="span"
            sx={{ mx: 0.5, fontSize: { xs: '1.1rem', md: '1rem' } }}
          >
            {avgRating}
          </Typography>
          <Typography sx={{ textDecoration: 'underline', mx: 0.7 }}>
            {reviewCount} review{reviewCount > 1 ? 's' : ''}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <VerifiedIcon color="error" sx={{ mr: 0.7 }} />
          <Typography>Recommended by 92% of tourists</Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <PlaceOutlinedIcon sx={{ mr: 0.7 }} />
          <Typography sx={{ textTransform: 'capitalize' }}>
            {tour.destination.name}, Philippines
          </Typography>
        </Box>
      </Box>
    </>
  );
};

export default TourHeader;
