import { Controller } from 'react-hook-form';
import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from '@mui/material';

const FilterByStatus = ({ control }) => {
  const options = ['confirmed', 'cancelled', 'completed'];

  const handleChange = (e, status, value, onChange) => {
    const checked = e.target.checked;
    const updated = checked
      ? [...value, status]
      : value.filter((v) => v !== status);

    onChange(updated);
  };

  return (
    <>
      <Typography variant="h6">Status</Typography>
      <FormGroup>
        {options.map((status) => {
          return (
            <Controller
              key={status}
              name="status"
              control={control}
              render={({ field: { value = [], onChange } }) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      name={status}
                      checked={value.includes(status)}
                      onChange={(e) =>
                        handleChange(e, status, value, onChange)
                      }
                    />
                  }
                  label={status[0].toUpperCase() + status.slice(1)}
                />
              )}
            />
          );
        })}
      </FormGroup>
    </>
  );
};

export default FilterByStatus;
