import { Controller } from 'react-hook-form';
import { Typography, Box, Divider } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers';

const tourDateFields = [
  { name: 'tourFrom', label: 'From' },
  { name: 'tourTo', label: 'To' },
];
const bookingDateFields = [
  { name: 'bookingFrom', label: 'From' },
  { name: 'bookingTo', label: 'To' },
];

const FilterByDate = ({ control, errors }) => {
  return (
    <>
      <Typography variant="h6">Date range by Tour</Typography>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {tourDateFields.map(({ name, label }) => (
          <Box key={name} sx={{ mt: 1 }}>
            <Typography>{label}</Typography>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  value={field.value || null}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      margin: 'dense',
                      error: !!errors[name],
                      helperText: errors[name]?.message,
                    },
                  }}
                />
              )}
            />
          </Box>
        ))}
      </LocalizationProvider>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Date range by Booking</Typography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {bookingDateFields.map(({ name, label }) => (
          <Box key={name} sx={{ mt: 1 }}>
            <Typography>{label}</Typography>
            <Controller
              name={name}
              control={control}
              render={({ field }) => (
                <DesktopDatePicker
                  {...field}
                  value={field.value || null}
                  onChange={(date) => field.onChange(date)}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: 'small',
                      margin: 'dense',
                      error: !!errors[name],
                      helperText: errors[name]?.message,
                    },
                  }}
                />
              )}
            />
          </Box>
        ))}
      </LocalizationProvider>
    </>
  );
};

export default FilterByDate;
