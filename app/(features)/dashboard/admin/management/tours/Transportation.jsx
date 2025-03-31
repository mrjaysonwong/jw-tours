import { Grid, FormControl, Select, MenuItem } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import ErrorText from '@/components/errors/ErrorText';

const Transportation = () => {
  const { control, errors } = useCreateTourContext();

  return (
    <Grid container columnSpacing={2}>
      <Grid item xs={12}>
        <FormControl
          fullWidth
          size="small"
          margin="dense"
          error={!!errors?.transportation?.type}
        >
          <Controller
            name="transportation.type"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select
                {...field}
                inputProps={{
                  id: 'transportation-select',
                }}
              >
                <MenuItem value={'walking'}>Walking</MenuItem>
                <MenuItem value={'public'}>Public transportation</MenuItem>
                <MenuItem value={'private'}>Private transportation</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        <ErrorText error={errors?.transportation?.type} />
      </Grid>
    </Grid>
  );
};

export default Transportation;
