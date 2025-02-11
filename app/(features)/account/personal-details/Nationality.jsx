import { Grid, TextField, Autocomplete } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useEditUserDetailsContext } from '@/app/(features)/account/contexts/EditUserDetailsProvider';
import { useUserSessionContext } from '@/contexts/UserProvider';
import { nationalities } from '@/data/countries/nationalities';

const Nationality = () => {
  const { user, control } = useEditUserDetailsContext();
  const session = useUserSessionContext();
  const isAdmin = session.user.role === 'admin';

  return (
    <>
      <Grid item xs={12} md={isAdmin ? 6 : 12}>
        <Controller
          name="nationality"
          control={control}
          defaultValue={user?.nationality || null}
          render={({ field: { name, value, onChange } }) => (
            <Autocomplete
              name={name}
              value={value}
              onChange={(e, newValue) => {
                onChange(newValue);
              }}
              noOptionsText="Nationality Not Found"
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
                  elevation: 2,
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
