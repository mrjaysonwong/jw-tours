import { Grid } from '@mui/material';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';

// internal imports
import { useEditUserDetailsContext } from '@/app/(features)/account/contexts/EditUserDetailsProvider';

const DateOfBirth = () => {
  const { user, control } = useEditUserDetailsContext();

  const date = user?.dateOfBirth;
  const minDate = dayjs('1900-01-01'); // Minimum date
  const maxDate = dayjs(); // Maximum date is today

  return (
    <>
      <Grid item xs={12} md={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            name="dateOfBirth"
            control={control}
            defaultValue={date ? dayjs(date) : null}
            render={({ field }) => {
              return (
                <DatePicker
                  {...field}
                  label="Date of Birth"
                  // disableFuture
                  minDate={minDate}
                  maxDate={maxDate}
                  slotProps={{ textField: { size: 'small', margin: 'dense' } }}
                  sx={{ width: '100%' }}
                />
              );
            }}
          />
        </LocalizationProvider>
      </Grid>
    </>
  );
};

export default DateOfBirth;
