import { Grid, TextField, Autocomplete, Box } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import { useEditUserDetailsContext } from '@/contexts/EditUserDetailsProvider';
import { languages } from '@/data/countries/languages';

const Languages = () => {
  const { user, control, params } = useEditUserDetailsContext();

  return (
    <Grid item xs={12} md={params.id ? 12 : 6}>
      <Controller
        name="languages"
        control={control}
        defaultValue={user?.languages || null}
        render={({ field }) => (
          <Autocomplete
            {...field}
            id="languages-select"
            multiple
            limitTags={1}
            options={languages.sort()}
            autoHighlight
            getOptionLabel={(option) => option}
            value={field.value || []}
            isOptionEqualToValue={(option, value) => option === value}
            onChange={(_, newValue) => {
              field.onChange(newValue);
            }}
            renderOption={(props, option) => {
              const { key, ...optionProps } = props;

              return (
                <Box key={props.id} component="li" {...optionProps}>
                  {option}
                </Box>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="dense"
                autoComplete="off"
                size="small"
                placeholder="Languages"
              />
            )}
          />
        )}
      />
    </Grid>
  );
};

export default Languages;
