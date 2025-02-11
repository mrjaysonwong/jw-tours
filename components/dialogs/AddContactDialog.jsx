// third-party imports
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  TextField,
  Grid,
  Box,
  Autocomplete,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import { useUserDetailsContext } from '@/contexts/UserProvider';
import {
  emailSchema,
  phoneNumberSchema,
} from '@/validation/yup/user/contactDetailsSchema';
import ErrorText from '@/components/errors/ErrorText';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import FormInput from '@/components/inputs/FormInput';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { phoneNumbers } from '@/data/countries/phoneNumbers';
import { API_URLS } from '@/constants/api';

const AddContactDialog = ({
  isAddContactOpen,
  setIsAddContactOpen,
  setIsOTPOpen,
  setEmail,
  setPhoneDetails,
  type,
}) => {
  const isEmailType = type === 'email';
  const { userId } = useUserDetailsContext();
  const { handleAlertMessage } = useMessageStore();

  const sortedNumbers = phoneNumbers.sort((a, b) => a.code - b.code);

  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(isEmailType ? emailSchema : phoneNumberSchema),
  });

  const handleOnClose = () => {
    setIsAddContactOpen(false);
    resetField(type);
  };

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.USERS}/${userId}/send-otp`;
      const requestData = { type, ...formData };

      const { data } = await axios.post(url, requestData);

      if (isEmailType) {
        setEmail(formData.email);
      } else {
        const { dialCode, phoneNumber } = formData.phone;

        setPhoneDetails({ phone: { dialCode, phoneNumber } });
      }
      setIsOTPOpen(true);
      setIsAddContactOpen(false);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  const renderTitle = () =>
    isEmailType ? 'Add Email Address' : 'Add Mobile Number';

  const renderText = () =>
    isEmailType ? 'email address' : 'mobile number via SMS';

  const EmailInput = () => (
    <FormInput
      register={register}
      inputName="email"
      type="email"
      label="Email"
      errors={errors.email}
    />
  );

  const PhoneInput = () => (
    <Grid container columnSpacing={2}>
      <Grid item xs={12} sm={7} md={7}>
        <Controller
          name="phone.dialCode"
          control={control}
          render={({ field }) => (
            <Autocomplete
              {...field}
              id="country-select"
              options={sortedNumbers}
              noOptionsText={`Can't find? Search by dial-code`}
              autoHighlight
              getOptionLabel={(option) => `+${option.dialCode}`}
              value={
                sortedNumbers.find(
                  (option) => option.dialCode === field.value
                ) || null
              }
              onChange={(_, newValue) => {
                field.onChange(newValue ? newValue.dialCode : '');
              }}
              renderOption={(props, option) => {
                const { key, ...optionProps } = props;
                return (
                  <Box
                    key={props.id}
                    component="li"
                    sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
                    {...optionProps}
                  >
                    <img
                      loading="lazy"
                      width="20"
                      srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                      src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                      alt=""
                    />
                    {option.label} ({option.code}) +{option.dialCode}
                  </Box>
                );
              }}
              renderInput={(params) => (
                <>
                  <TextField
                    {...params}
                    margin="dense"
                    label="Country Dial-code"
                    size="small"
                    error={!!errors.phone?.dialCode}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'off',
                    }}
                  />
                  <ErrorText error={errors.phone?.dialCode} />
                </>
              )}
            />
          )}
        />
      </Grid>

      <Grid item xs={12} sm={5} md={5}>
        <FormInput
          register={register}
          type="phone"
          inputName="phone.phoneNumber"
          label="Phone Number"
          errors={errors.phone?.phoneNumber}
        />
      </Grid>
    </Grid>
  );

  const renderField = () => (isEmailType ? <EmailInput /> : <PhoneInput />);

  return (
    <Dialog open={isAddContactOpen}>
      <DialogTitle>{renderTitle()}</DialogTitle>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent dividers sx={{ borderBottom: 'none' }}>
          <DialogContentText sx={{ mb: 3 }}>
            A one-time password (OTP) will be sent to your {renderText()}.
          </DialogContentText>

          {renderField()}
        </DialogContent>

        <DialogActions sx={{ mx: 2, py: 2 }}>
          <Button type="button" disabled={isSubmitting} onClick={handleOnClose}>
            Cancel
          </Button>

          <FormSubmitButton
            label="Send OTP"
            action="create"
            isSubmitting={isSubmitting}
          />
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddContactDialog;
