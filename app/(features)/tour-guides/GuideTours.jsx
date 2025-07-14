import Link from 'next/link';
import { Typography, Box } from '@mui/material';

// internal imports
import { formatUrl } from '@/utils/formats/common';
import { useGuideData } from '@/contexts/GuideProfileProvider';

const GuideTours = () => {
  const { name, tours } = useGuideData();
  
  return (
    <Box sx={{ my: 1 }}>
      <Typography variant="h6">
        Tours by <span style={{ textTransform: 'capitalize' }}>{name}.</span>
      </Typography>

      {tours.length === 0 ? (
        <div>No tours yet</div>
      ) : (
        <ul>
          {tours.map((tour) => {
            const href = `/tours/${formatUrl(
              tour.geoLocation
            )}/${formatUrl(tour.destination.name)}/${tour._id}`;
            return (
              <li key={tour._id} style={{ textTransform: 'capitalize' }}>
                <Link href={href} target="_blank">
                  {tour.destination.name}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </Box>
  );
};

export default GuideTours;
