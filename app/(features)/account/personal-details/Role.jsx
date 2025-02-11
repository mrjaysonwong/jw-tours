import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useEditUserDetailsContext } from '@/app/(features)/account/contexts/EditUserDetailsProvider';

const Role = () => {
  const { user, control } = useEditUserDetailsContext();

  return (
    <>
      <Grid item xs={12} md={6}>
        <FormControl fullWidth size="small" margin="dense">
          <InputLabel htmlFor="role-select">Role</InputLabel>
          <Controller
            name="role"
            control={control}
            defaultValue={user?.role}
            render={({ field }) => (
              <Select
                {...field}
                label="Role"
                inputProps={{
                  id: 'role-select',
                }}
              >
                <MenuItem value={'user'}>User</MenuItem>
                <MenuItem value={'guide'}>Guide</MenuItem>
                <MenuItem value={'partner'}>Partner</MenuItem>
                <MenuItem value={'agent'}>Agent</MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Grid>
    </>
  );
};

export default Role;
