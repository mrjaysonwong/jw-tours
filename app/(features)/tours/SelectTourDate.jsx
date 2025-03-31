import { useState, useCallback } from 'react';
import { Box, Typography, Badge, InputAdornment } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import {
  LocalizationProvider,
  DesktopDatePicker,
  PickersDay,
} from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import TourIcon from '@mui/icons-material/Tour';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';

// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';
import ErrorText from '@/components/errors/ErrorText';
import { getDurationInDays } from '@/utils/common';

const currentYear = dayjs().year();
const nextYear = currentYear + 1;

dayjs.extend(isBetween);

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
  control,
  errors,
  setValue,
  setError,
  clearErrors,
  setIsOverlappingDate,
}) => {
  const [open, setOpen] = useState(false);
  const { tour, bookings } = useTourDetails();
  const [errorMessage, setErrorMessage] = useState(null);
  const error = errors.tourDate || errorMessage;

  const isMultiDay = /day|week/.test(tour.duration);
  const durationDays = getDurationInDays(tour.duration);

  //  Extract booked dates from bookings
  const bookedDates = bookings.map((booking) => {
    const date = dayjs(booking.tourDate);
    return date.format('YYYY-MM-DD');
  });

  const shouldDisableDate = useCallback(
    (date) => {
      const formattedDate = date.format('YYYY-MM-DD');
      const isToday = date.isSame(dayjs(), 'day');
      const dayOfWeek = date.format('dddd');

      return (
        isToday ||
        bookedDates.includes(formattedDate) ||
        (isMultiDay &&
          bookings.some((booking) => {
            const startDate = dayjs(booking.tourDate);
            return date.isBetween(
              startDate,
              startDate.add(durationDays - 1, 'day'),
              null,
              '[]'
            );
          })) ||
        !tour.tourAvailability.includes(dayOfWeek)
      );
    },
    [bookedDates, bookings, durationDays, isMultiDay, tour.tourAvailability]
  );

  const handleChange = useCallback(
    (newValue) => {
      const isOverlapping =
        isMultiDay &&
        bookings.some((booking) => {
          const bookedStart = dayjs(booking.tourDate);
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
      } else {
        clearErrors('tourDate');
        setErrorMessage(null);
        setIsOverlappingDate(false);
      }

      setValue('tourDate', newValue, { shouldValidate: true });
    },
    [
      bookings,
      durationDays,
      isMultiDay,
      setError,
      clearErrors,
      setValue,
      setIsOverlappingDate,
    ]
  );

  const handleCalendarClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Box
        sx={{
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '32px',
          mt: 1.5,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{ fontWeight: 500, ml: 2, width: { xs: '190px', lg: '230px' } }}
          >
            Tour date:
          </Typography>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
              name="tourDate"
              control={control}
              defaultValue={null}
              render={({ field }) => {
                return (
                  <DesktopDatePicker
                    {...field}
                    open={open}
                    onClose={handleCalendarClose}
                    closeOnSelect={open}
                    onChange={handleChange}
                    onAccept={() => {
                      document.activeElement?.blur();
                      setTimeout(() => {
                        document.getElementById('startTimeSelect')?.focus();
                      }, 50);
                    }}
                    minDate={dayjs().startOf('year')}
                    maxDate={dayjs().year(nextYear).endOf('year')}
                    disablePast
                    disableHighlightToday
                    shouldDisableDate={shouldDisableDate}
                    slots={{
                      day: (props) => {
                        return (
                          <TourDay
                            {...props}
                            shouldDisableDate={shouldDisableDate}
                            tourAvailability={tour.tourAvailability}
                          />
                        );
                      },
                    }}
                    slotProps={{
                      textField: {
                        size: 'small',
                        margin: 'dense',
                        error: !!error,
                        onClick: () => setOpen(true),
                        style: {
                          marginLeft: 'auto',
                          marginRight: 4,
                          marginTop: 4,
                          marginBottom: 4,
                        },
                        inputProps: {
                          readOnly: true,
                          style: {
                            cursor: 'pointer',
                          },
                        },
                        InputProps: {
                          endAdornment: (
                            <InputAdornment position="end">
                              <EventOutlinedIcon />
                            </InputAdornment>
                          ),
                        },
                      },
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '32px',
                        bgcolor: 'rgba(169,169,169,0.1)',
                      },
                    }}
                  />
                );
              }}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <ErrorText error={error} />
    </>
  );
};

export default SelectTourDate;
