import { Autocomplete, TextField } from '@mui/material';
import { Controller } from 'react-hook-form';

// internal imports
import ErrorText from '@/components/errors/ErrorText';

const AutoCompleteInput = ({
  inputName,
  defaultValue,
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
          defaultValue={defaultValue}
          control={control}
          render={({ field }) => (
            <Autocomplete
              id={id}
              multiple
              limitTags={1}
              options={options}
              autoHighlight
              getOptionLabel={(option) => option}
              value={field.value || []}
              isOptionEqualToValue={(option, value) => option === value}
              onChange={(_, newValue) => {
                setValue(inputName, newValue.length > 0 ? newValue : null, {
                  shouldValidate: true,
                });
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    margin="dense"
                    size="small"
                    placeholder={placeholder}
                    error={!!error}
                    inputRef={field.ref}
                    name={field.name}
                  />

                  <ErrorText error={error?.message} />
                </>
              )}
            />
          )}
        />
      ) : (
        <Controller
          name={inputName}
          defaultValue={defaultValue}
          control={control}
          render={({ field }) => (
            <Autocomplete
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
                    inputRef={field.ref}
                    name={field.name}
                  />

                  <ErrorText error={error?.message} />
                </>
              )}
            />
          )}
        />
      )}
    </>
  );
};

export default AutoCompleteInput;
