import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useEditUserDetailsContext } from '@/contexts/EditUserDetailsProvider';

const Gender = () => {
  const { user, control } = useEditUserDetailsContext();

  return (
    <>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth size="small" margin="dense">
          <InputLabel htmlFor="gender-select">Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            defaultValue={user?.gender ?? ''}
            render={({ field }) => (
              <Select
                {...field}
                label="Gender"
                inputProps={{
                  id: 'gender-select',
                }}
              >
                <MenuItem value={'male'}>Male</MenuItem>
                <MenuItem value={'female'}>Female</MenuItem>
                <MenuItem value={'other'}>Other</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default Gender;
