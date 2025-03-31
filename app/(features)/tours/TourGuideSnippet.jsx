import Link from 'next/link';
import {
  Typography,
  Box,
  Card,
  CardHeader,
  CardContent,
  Avatar,
  Rating,
} from '@mui/material';

// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import { formatUrl } from '@/utils/formats/formatUrl';

const TourGuideSnippet = () => {
  const { tour } = useTourDetails();
  const place = tour.guide.address.city || tour.guide.address.name;
  const lastNameInitial = tour.guide.lastName.slice(0, 1);
  const name = formatUrl(`${tour.guide.firstName} ${lastNameInitial}`);

  const formattedPlace = formatUrl(place) || 'manila';

  const href = `/tour-guides/${formattedPlace}/profile/${name}/${tour.guide._id}`;

  return (
    <>
      <Link href={href}>
        <Card sx={{ display: 'flex', alignItems: 'center', my: 5 }}>
          <CardHeader
            avatar={
              <Avatar
                src={tour.guide.image.url}
                sx={{ width: 64, height: 64 }}
              />
            }
          />

          <CardContent sx={{ pl: 0 }}>
            <Typography variant="body2">
              Your guide in{' '}
              <span style={{ textTransform: 'capitalize' }}>
                {tour.destination.name}:
              </span>
            </Typography>
            <Typography sx={{ fontWeight: 550, py: 0.3 }}>
              {tour.guide.firstName} {lastNameInitial}.
            </Typography>
            <Typography variant="body2">
              Mabuhay! My Name is Fedil and I would like to invite you visit my
              beautiful country of...
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Rating
                name="half-rating-read"
                defaultValue={5}
                readOnly
                size="small"
                sx={{ color: '#FCC737' }}
              />
              <Typography sx={{ mx: 0.5 }}>5</Typography>
              <Typography
                variant="body2"
                sx={{ mx: 1, textDecoration: 'underline' }}
              >
                42 reviews
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default TourGuideSnippet;
