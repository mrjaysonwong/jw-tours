import { Controller } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Divider,
} from '@mui/material';

// internal imports
import { transportationOptions } from '@/validation/yup/tour/filtersSchema';

const FilterByTransportation = ({ control }) => {
  const handleChange = (e, transportation, value, onChange) => {
    const checked = e.target.checked;
    const updated = checked
      ? [...value, transportation]
      : value.filter((v) => v !== transportation);

    onChange(updated);
  };

  return (
    <>
      <Divider sx={{ my: 2 }} />

      <Typography variant="h6">Transportation</Typography>
      <FormGroup>
        {transportationOptions.map((transportation) => {
          return (
            <Controller
              key={transportation}
              name="transportation"
              control={control}
              render={({ field: { value = [], onChange } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={transportation}
                      checked={value.includes(transportation)}
                      onChange={(e) =>
                        handleChange(e, transportation, value, onChange)
                      }
                    />
                  }
                  label={
                    transportation[0].toUpperCase() + transportation.slice(1)
                  }
                />
              )}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default FilterByTransportation;
