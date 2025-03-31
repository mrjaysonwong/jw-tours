import { Grid, TextField, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useEditUserDetailsContext } from '@/contexts/EditUserDetailsProvider';
import { nationalities } from '@/data/countries/nationalities';

const Nationality = () => {
  const { user, control } = useEditUserDetailsContext();

  return (
    <>
      <Grid item xs={12} md={6}>
        <Controller
          name="nationality"
          control={control}
          defaultValue={user?.nationality || null}
          render={({ field: { name, value, onChange } }) => (
            <Autocomplete
              name={name}
              value={value}
              onChange={(_, newValue) => {
                onChange(newValue);
              }}
              options={nationalities.map((option) => `${option.label}`)}
              renderInput={(params) => (
                <TextField
                  {...params}
                 
                  margin="dense"
                  autoComplete="off"
                  size="small"
                  label="Nationality"
                />
              )}
              slotProps={{
                paper: {
                  elevation: 5,
                },
              }}
            />
          )}
        />
      </Grid>
    </>
  );
};

export default Nationality;
