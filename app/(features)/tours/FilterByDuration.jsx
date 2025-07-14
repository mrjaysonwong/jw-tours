import { Controller } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

export const durationOptions = [
  { label: '1-5 hours', min: 1, max: 5 },
  { label: '5-12 hours', min: 5, max: 12 },
  { label: '12-23 hours', min: 12, max: 23 },
  { label: 'Multi - day (24+ hours)', min: 24, max: 24 },
];

const FilterByDuration = ({ control }) => {
  const handleChange = (e, range, value, onChange) => {
    const checked = e.target.checked;

    const updated = checked
      ? [...value, range]
      : value.filter((v) => v !== range);

    onChange(updated);
  };
  return (
    <>
      <Typography variant="h6">Duration</Typography>
      <FormGroup>
        {durationOptions.map((duration) => {
          const range = `${duration.min}-${duration.max}`;

          return (
            <Controller
              key={range}
              name="duration"
              control={control}
              render={({ field: { value = [], onChange } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={range}
                      checked={value.includes(range)}
                      onChange={(e) => handleChange(e, range, value, onChange)}
                    />
                  }
                  label={duration.label}
                />
              )}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default FilterByDuration;
