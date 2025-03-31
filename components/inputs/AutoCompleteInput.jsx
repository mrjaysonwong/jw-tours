import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import ErrorText from '@/components/errors/ErrorText';

const AutoCompleteInput = ({
  inputName,
  placeholder = null,
  label = null,
  id,
  control,
  multiple = false,
  options,
  error,
  setValue,
}) => {
  return (
    <>
      {multiple ? (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              id={id}
              multiple
              limitTags={1}
              options={options}
              autoHighlight
              getOptionLabel={(option) => option}
              value={field.value || []}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(_, newValue) => {
                setValue(
                  inputName,
                  newValue.length > 0 ? newValue : undefined,
                  {
                    shouldValidate: true,
                  }
                );
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    margin="dense"
                    size="small"
                    placeholder={placeholder}
                    error={!!error}
                  />

                  <ErrorText error={error?.message} />
                </>
              )}
              slotProps={{
                paper: {
                  elevation: 4,
                },
              }}
            />
          )}
        />
      ) : (
        <Controller
          name={inputName}
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              id={id}
              options={options}
              autoHighlight
              getOptionLabel={(option) => option}
              value={field.value || null}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(_, newValue) => {
                field.onChange(newValue);
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    margin="dense"
                    size="small"
                    label={label}
                    error={!!error}
                  />

                  <ErrorText error={error?.message} />
                </>
              )}
              slotProps={{
                paper: {
                  elevation: 4,
                },
              }}
            />
          )}
        />
      )}
    </>
  );
};

export default AutoCompleteInput;
