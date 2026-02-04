import Link from 'next/link';
import {
  Typography,
  Card,
  CardHeader,
  CardContent,
  Avatar,
} from '@mui/material';

// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import { formatUrl } from '@/utils/formats/common';

const TourGuideSnippet = () => {
  const { tour } = useTourDetails();
  const place = tour?.guide?.address?.city || tour?.guide?.address?.name;
  const lastNameInitial = tour.guide.lastName.slice(0, 1);
  const name = formatUrl(`${tour.guide.firstName} ${lastNameInitial}`);

  const formattedPlace = formatUrl(place) ?? 'manila';

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
          </CardContent>
        </Card>
      </Link>
    </>
  );
};

export default TourGuideSnippet;
