import { Checkbox, FormControlLabel } from '@mui/material';
import { Controller } from 'react-hook-form';
import { useTourFormContext } from './CardForm';

const TourCancellation = () => {
  const { control, setValue, tour } = useTourFormContext();

  const handleEnabaleCancellation = (value) => {
    setValue('freeCancellation.isFreeCancellation', value);
  };

  return (
    <Controller
      name="freeCancellation.isFreeCancellation"
      control={control}
      defaultValue={tour?.freeCancellation?.isFreeCancellation || false}
      render={({ field }) => (
        <FormControlLabel
          control={
            <Checkbox
              checked={field.value}
              onChange={(_, newValue) => {
                handleEnabaleCancellation(newValue);
              }}
              inputProps={{
                id: 'switch-enable-freeCancellation',
              }}
            />
          }
          label="Enable Free Cancellation"
        />
      )}
    />
  );
};

export default TourCancellation;
