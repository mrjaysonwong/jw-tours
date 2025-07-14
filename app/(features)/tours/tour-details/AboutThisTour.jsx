import Link from 'next/link';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import EventAvailableOutlinedIcon from '@mui/icons-material/EventAvailableOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';

// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import { iconMapping } from '@/constants/iconMaps/icons';

const LanguageChips = ({ languages = [] }) => {
  const firstLang = languages[0];
  const remaining = languages.slice(1);

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
      {firstLang && <Chip size="small" label={firstLang} />}

      {remaining.length > 0 && (
        <Tooltip title={remaining.join(', ')} arrow placement="top-start">
          <Chip
            size="small"
            label={`+${remaining.length} more`}
            sx={{ cursor: 'pointer' }}
          />
        </Tooltip>
      )}
    </Box>
  );
};

const AboutThisTour = () => {
  const { tour } = useTourDetails();
  const isFreeCancellation = tour.freeCancellation.isFreeCancellation;

  return (
    <Box sx={{ svg: { fontSize: '1.8rem' } }}>
      {isFreeCancellation && (
        <Box sx={{ display: 'flex', gap: 1 }}>
          <EventAvailableOutlinedIcon />
          <Typography sx={{ a: { color: 'inherit' } }}>
            <Link href="#">
              <span style={{ textDecoration: 'underline' }}>
                Free cancellation
              </span>
            </Link>{' '}
            up to 24 hours before the experience starts (local time)
          </Typography>
        </Box>
      )}

      <Box sx={{ display: 'flex', gap: 1, my: 2 }}>
        <LanguageOutlinedIcon />
        <Typography>Tour Languages: </Typography>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
          <LanguageChips languages={tour.guide.languages} />
        </Box>
      </Box>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <Box>{iconMapping[tour.transportation.type]}</Box>
        <Typography>Transportation: </Typography>
        <Chip
          size="small"
          label={tour.transportation.type}
          sx={{ textTransform: 'capitalize' }}
        />
      </Box>
    </Box>
  );
};

export default AboutThisTour;
