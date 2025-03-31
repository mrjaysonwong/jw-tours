// third-party imports
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// internal imports
import ErrorText from '@/components/errors/ErrorText';

const FormInput = ({
  register,
  inputName,
  type,
  label = null,
  placeholder = null,
  errors,
  showPassword,
  handleShowPassword,
  isNewPasswordField = false,
  showNewPassword,
  handleShowNewPassword,
  defaultValue,
  multiline = false,
  maxRows = 1,
  margin = 'dense',
  hasAdornment = false,
  handleChange = () => {},
  autoComplete = 'on',
  readOnly = false,
  isDisabled = false
}) => {
  const { ref, onChange, ...restRegister } = register(inputName);

  return (
    <>
      {type !== 'password' ? (
        <TextField
          {...restRegister}
          inputRef={ref}
          fullWidth
          size="small"
          margin={margin}
          label={label}
          placeholder={placeholder}
          name={inputName}
          defaultValue={defaultValue}
          disabled={isDisabled}
          onChange={(e) => {
            onChange(e);
            handleChange?.(e);
          }}
          error={!!errors}
          autoComplete={autoComplete}
          multiline={multiline}
          maxRows={maxRows}
          InputProps={{
            startAdornment: hasAdornment && (
              <InputAdornment position="start">$</InputAdornment>
            ),
          }}
          inputProps={{
            readOnly,
          }}
        />
      ) : (
        <TextField
          {...register(inputName)}
          fullWidth
          size="small"
          margin="dense"
          label={label}
          name={inputName}
          error={!!errors}
          type={
            isNewPasswordField
              ? showNewPassword
                ? 'text'
                : 'password'
              : showPassword
              ? 'text'
              : 'password'
          }
          autoComplete="off"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={
                    handleShowNewPassword
                      ? handleShowNewPassword
                      : handleShowPassword
                  }
                >
                  {isNewPasswordField ? (
                    showNewPassword ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )
                  ) : showPassword ? (
                    <Visibility />
                  ) : (
                    <VisibilityOff />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      )}

      <ErrorText error={errors} />
    </>
  );
};

export default FormInput;
