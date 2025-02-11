// third-party imports
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// internal imports
import ErrorText from '../errors/ErrorText';

const FormInput = ({
  register,
  inputName,
  type,
  label,
  errors,
  showPassword,
  handleShowPassword,
  isNewPasswordField = false,
  showNewPassword,
  handleShowNewPassword,
  defaultValue,
}) => {
  return (
    <>
      {type !== 'password' ? (
        // destructure and spread register, onChange, onBlur from register object props
        <TextField
          {...register(inputName)}
          fullWidth
          size="small"
          margin="dense"
          label={label}
          name={inputName}
          defaultValue={defaultValue}
          error={!!errors}
          autoComplete="on"
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
