import { useState, useCallback } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Modal,
  Paper,
  Badge,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DateCalendar,
  PickersDay,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import TourIcon from '@mui/icons-material/Tour';

// internal imports
import { useTourDetails } from '@/contexts/TourContextProvider';
import ErrorText from '@/components/errors/ErrorText';
import { getDurationInDays } from '@/utils/common';
import ClickAwayListener from '@/components/common/ClickAwayListener';

dayjs.extend(isBetween);

const currentYear = dayjs().year();
const nextYear = currentYear + 1;

// Custom TourDay Component for Calendar Styling
const TourDay = ({
  day,
  outsideCurrentMonth,
  shouldDisableDate,
  tourAvailability,
  ...other
}) => {
  const isDisabled = !outsideCurrentMonth && shouldDisableDate(day);
  const showBadge =
    isDisabled &&
    !day.isSame(dayjs(), 'day') &&
    tourAvailability.includes(day.format('dddd'));

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

const SelectTourDate = ({
  errors,
  setValue,
  setError,
  clearErrors,
  setIsOverlappingDate,
}) => {
  const [open, setOpen] = useState(false);
  const { tour, bookings } = useTourDetails();
  const [selectedDate, setSelectedDate] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const error = errors.tourDate || errorMessage;

  const isMultiDay = /day|week/.test(tour.duration.unit);
  const durationDays = getDurationInDays(tour.duration);

  const bookedDates = bookings?.map((booking) =>
    dayjs(booking?.bookingRequest?.tourDate).format('YYYY-MM-DD')
  );

  const shouldDisableDate = useCallback(
    (date) => {
      const formattedDate = date.format('YYYY-MM-DD');
      const isToday = date.isSame(dayjs(), 'day');
      const dayOfWeek = date.format('dddd');

      return (
        isToday ||
        bookedDates?.includes(formattedDate) ||
        (isMultiDay &&
          bookings?.some((booking) => {
            const startDate = dayjs(booking?.bookingRequest?.tourDate);
            return date.isBetween(
              startDate,
              startDate.add(durationDays - 1, 'day'),
              null,
              '[]'
            );
          })) ||
        !tour?.tourAvailability?.includes(dayOfWeek)
      );
    },
    [bookedDates, bookings, durationDays, isMultiDay, tour.tourAvailability]
  );

  const handleDateChange = (newValue) => {
    if (!newValue) return;

    const isOverlapping =
      isMultiDay &&
      bookings?.some((booking) => {
        const bookedStart = dayjs(booking?.bookingRequest?.tourDate);
        return (
          newValue.isBetween(
            bookedStart,
            bookedStart.add(durationDays - 1, 'day'),
            null,
            '[]'
          ) ||
          newValue
            .add(durationDays - 1, 'day')
            .isBetween(
              bookedStart,
              bookedStart.add(durationDays - 1, 'day'),
              null,
              '[]'
            )
        );
      });

    if (isOverlapping) {
      const message = `Choose a date that is at least ${durationDays} days before or after the conflicting tour dates.`;
      setError('tourDate', { message });
      setErrorMessage(message);
      setIsOverlappingDate(true);
      setOpen(false);
    } else {
      clearErrors('tourDate');
      setErrorMessage(null);
      setIsOverlappingDate(false);
      setSelectedDate(newValue);
      setValue('tourDate', newValue, { shouldValidate: true });
      setOpen(false);
    }
  };

  const handleClickAway = (event) => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          mt: 1.5,
        }}
      >
        <Typography sx={{ fontWeight: 500, mx: 2 }}>Tour date:</Typography>

        <Box
          onClick={() => setOpen(true)}
          sx={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            py: 0.5,
            m: 0.5,
            borderRadius: '32px',
            bgcolor: 'rgba(169,169,169,0.1)',
            border: '1px solid',
            borderColor: !!error ? '#f44336' : 'divider',
            ':hover': {
              border: !error && '1px solid',
            },
          }}
        >
          <Typography sx={{ px: 1.5 }}>
            {selectedDate
              ? dayjs(selectedDate).format('MMM DD, YYYY')
              : 'Select date'}
          </Typography>

          <IconButton disableRipple sx={{ p: 0.5, mr: 1 }}>
            <EventOutlinedIcon />
          </IconButton>
        </Box>
      </Box>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
          }}
        >
          <ClickAwayListener onClickAway={handleClickAway}>
            <Paper sx={{ p: 2 }}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar
                  value={selectedDate}
                  disablePast
                  disableHighlightToday
                  shouldDisableDate={shouldDisableDate}
                  minDate={dayjs().startOf('year')}
                  maxDate={dayjs().year(nextYear).endOf('year')}
                  onChange={handleDateChange}
                  slots={{
                    day: (props) => (
                      <TourDay
                        {...props}
                        shouldDisableDate={shouldDisableDate}
                        tourAvailability={tour.tourAvailability}
                      />
                    ),
                  }}
                />
              </LocalizationProvider>
            </Paper>
          </ClickAwayListener>
        </Box>
      </Modal>

      <ErrorText error={error} />
    </>
  );
};

export default SelectTourDate;
