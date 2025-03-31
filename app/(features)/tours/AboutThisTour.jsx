import Link from 'next/link';
import { Box, Typography } from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';

const AboutThisTour = () => {
  const { tour } = useTourDetails();

  return (
    <Box sx={{ svg: { fontSize: '1.8rem' } }}>
      <Box sx={{ display: 'flex' }}>
        <EventAvailableOutlinedIcon sx={{ mr: 1 }} />
        <Typography sx={{ a: { color: 'inherit' } }}>
          <Link href="#">
            <span style={{ textDecoration: 'underline' }}>
              Free cancellation
            </span>
          </Link>{' '}
          up to 24 hours before the experience starts (local time)
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', my: 2 }}>
        <LanguageOutlinedIcon sx={{ mr: 1 }} />
        <Typography>
          Tour Languages:{' '}
          <span style={{ color: 'gray' }}>
            {tour.guide.languages.join(', ')}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default AboutThisTour;
