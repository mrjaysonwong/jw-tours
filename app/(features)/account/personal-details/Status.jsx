import { Grid, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useEditUserDetailsContext } from '@/contexts/EditUserDetailsProvider';

const Status = () => {
  const { user, control } = useEditUserDetailsContext();
  return (
    <Grid item xs={12} md={6}>
      <FormControl fullWidth size="small" margin="dense">
        <InputLabel htmlFor="status-select">Status</InputLabel>
        <Controller
          name="status"
          control={control}
          defaultValue={user?.status}
          render={({ field }) => (
            <Select
              {...field}
              label="Status"
              inputProps={{
                id: 'status-select',
              }}
            >
              <MenuItem value={'active'}>Active</MenuItem>
              <MenuItem value={'pending'}>Pending</MenuItem>
              <MenuItem value={'suspended'}>Suspended</MenuItem>
              <MenuItem value={'inactive'}>Inactive</MenuItem>
            </Select>
          )}
        />
      </FormControl>
    </Grid>
  );
};

export default Status;
