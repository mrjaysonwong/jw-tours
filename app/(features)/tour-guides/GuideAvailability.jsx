'use client';
import { useCallback } from 'react';
import { Badge, Card, Box, Typography } from '@mui/material';
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import TourIcon from '@mui/icons-material/Tour';

// internal imports
import { getDurationInDays } from '@/utils/common';
import { useGuideData } from '@/contexts/GuideProfileProvider';

const currentYear = dayjs().year();
const nextYear = currentYear + 1;

dayjs.extend(isBetween);

const TourDay = ({ day, outsideCurrentMonth, shouldDisableDate, ...other }) => {
  const isDisabled = !outsideCurrentMonth && shouldDisableDate(day);
  const showBadge = isDisabled;

  return (
    <Badge
      overlap="circular"
      badgeContent={
        showBadge ? (
          <TourIcon color="error" sx={{ fontSize: '1.2rem' }} />
        ) : null
      }
      sx={{ '& .MuiBadge-badge': { right: 8, top: 5 } }}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
};

const GuideAvailability = () => {
  const { bookings } = useGuideData();

  //  Extract booked dates from bookings
  const bookedDates = bookings?.map((booking) => {
    return dayjs(booking?.bookingRequest?.tourDate).format('YYYY-MM-DD');
  });

  const shouldDisableDate = useCallback(
    (date) => {
      const formattedDate = date.format('YYYY-MM-DD');

      return (
        bookedDates?.includes(formattedDate) ||
        bookings?.some((booking) => {
          const durationDays = getDurationInDays(booking.tour.duration);
          const isMultiDay = /day|week/.test(booking.tour.duration);
          const startDate = dayjs(booking?.bookingRequest?.tourDate);

          return (
            isMultiDay &&
            date.isBetween(
              startDate,
              startDate.add(durationDays - 1, 'day'),
              null,
              '[]'
            )
          );
        })
      );
    },
    [bookedDates, bookings]
  );

  return (
    <>
      <Typography variant="h6">Guide Availability</Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Card sx={{ width: '310px', mx: 'auto', my: 1 }}>
          <DateCalendar
            disablePast
            disableHighlightToday
            minDate={dayjs().startOf('year')}
            maxDate={dayjs().year(nextYear).endOf('year')}
            shouldDisableDate={shouldDisableDate}
            slots={{
              day: (props) => {
                return (
                  <TourDay {...props} shouldDisableDate={shouldDisableDate} />
                );
              },
            }}
          />
        </Card>
      </LocalizationProvider>

      <Box
        sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <TourIcon color="error" sx={{ mr: 1 }} />
        <Typography variant="body2">Not Available</Typography>
      </Box>
    </>
  );
};

export default GuideAvailability;
