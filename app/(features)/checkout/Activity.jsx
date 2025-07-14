import { Grid, Avatar, Box, Divider, Typography } from '@mui/material';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import InsertEmoticonOutlinedIcon from '@mui/icons-material/InsertEmoticonOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import dayjs from 'dayjs';

// internal imports
import { formatISOlong } from '@/utils/formats/formatDates';
import { formatLastName } from '@/utils/formats/common';
import MeetingPickup from './MeetingPickup';
import { useCheckoutContext } from '@/contexts/CheckoutProvider';

const Activity = () => {
  const { tour, bookingRequest } = useCheckoutContext();

  return (
    <>
      <Typography variant="h5" color="primary">
        Activity
      </Typography>

      <Grid container spacing={2} sx={{ my: 1 }}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: 'flex' }}>
            <Avatar
              src={tour.images[0].url}
              sx={{
                width: { xs: 84, md: 64 },
                height: { xs: 84, md: 64 },
                borderRadius: '4px',
              }}
            />
            <Box>
              <Typography sx={{ fontWeight: 550, mx: 2, maxWidth: '300px' }}>
                {tour.title}
              </Typography>
            </Box>
          </Box>
        </Grid>

        <Grid item xs={12} md={6}>
          <Box
            sx={{
              '& div': {
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              },

              '& div:not(:first-child)': { mt: 1 },
            }}
          >
            <Box>
              <PeopleOutlinedIcon />
              <Typography>
                Size: {bookingRequest.partySize}{' '}
                {bookingRequest.partySize > 1 ? 'people' : 'person'}
              </Typography>
            </Box>

            <Box>
              <EventOutlinedIcon />
              <Typography>
                Date: {dayjs(bookingRequest.tourDate).format('ddd')},{' '}
                {formatISOlong(bookingRequest.tourDate)} at{' '}
                {bookingRequest.startTime}
              </Typography>
            </Box>

            <Box>
              <AccessTimeOutlinedIcon />
              <Typography>
                Duration: {tour.duration.value} {tour.duration.unit}
              </Typography>
            </Box>

            <Box>
              <InsertEmoticonOutlinedIcon />
              <Typography>
                Guide: {tour.guide.firstName}{' '}
                {formatLastName(tour.guide.lastName)}.
              </Typography>
            </Box>
            <Box>
              <LanguageOutlinedIcon />
              <Typography>
                Language: {tour.guide.languages.join(', ')}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <MeetingPickup />
    </>
  );
};

export default Activity;
