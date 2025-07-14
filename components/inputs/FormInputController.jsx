import { Controller } from 'react-hook-form';
import { TextField, InputAdornment } from '@mui/material';

// internal imports
import ErrorText from '@/components/errors/ErrorText';
import { visaIcon, masterCardIcon, genericCardIcon } from '@/constants/iconMaps/icons';

const FormInputController = ({
  control,
  inputName,
  placeholder,
  errors,
  maxLength = 'auto',
  onChange,
  hasAdornment = false,
}) => {
  return (
    <Controller
      name={inputName}
      control={control}
      defaultValue=""
      render={({ field }) => {
        const { ref, ...restField } = field;

        return (
          <>
            <TextField
              {...restField}
              name={inputName}
              inputRef={ref}
              fullWidth
              size="small"
              margin="dense"
              placeholder={placeholder}
              error={!!errors}
              onChange={(e) => {
                const value = onChange ? onChange(e) : e.target.value;
                field.onChange(value);
              }}
              inputProps={{ maxLength: maxLength }}
              InputProps={{
                startAdornment: hasAdornment && (
                  <InputAdornment position="start">
                    <img
                      src={
                        field.value.startsWith('4')
                          ? visaIcon
                          : field.value.startsWith('5')
                          ? masterCardIcon
                          : genericCardIcon
                      }
                      alt="card icon"
                      loading="eager"
                      style={{ width: 30, height: 'auto' }}
                    />
                  </InputAdornment>
                ),
              }}
            />

            {errors && <ErrorText error={errors.message} />}
          </>
        );
      }}
    />
  );
};

export default FormInputController;
