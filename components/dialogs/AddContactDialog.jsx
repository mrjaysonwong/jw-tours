// third-party imports
import React, { useState, useEffect } from 'react';
import { fireBaseAuth } from '@/firebase.config';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
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
import { countryData } from '@/data/countries/countryData';
import { API_URLS } from '@/config/apiRoutes';
import VerifyOTPDialog from './VerifyOTPDialog';

const AddContactDialog = ({
  title,
  isAddContactOpen,
  setIsAddContactOpen,
  type,
}) => {
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);
  const [confirmationResult, setConfirmationResult] = useState(null);
  const [isOTPOpen, setIsOTPOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [phoneDetails, setPhoneDetails] = useState({
    phone: {
      dialCode: '',
      phoneNumber: '',
    },
  });

  const { handleAlertMessage } = useMessageStore();

  const { userId } = useUserDetailsContext();
  const isEmailType = type === 'email';
  const sortedNumbers = countryData.sort((a, b) => a.code - b.code);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(isEmailType ? emailSchema : phoneNumberSchema),
  });

  const handleClose = () => {
    setIsAddContactOpen(false);
  };

  useEffect(() => {
    if (!fireBaseAuth) return;

    const verifier = new RecaptchaVerifier(
      fireBaseAuth,
      'recaptcha-container',
      {
        size: 'invisible',
      }
    );

    setRecaptchaVerifier(verifier);

    return () => {
      verifier.clear();
    };
  }, []);

  // for dev test use 127.0.0.1:3000 send mobile otp
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

        const completePhone = `+${dialCode}${phoneNumber}`;
        const confirmationResult = await signInWithPhoneNumber(
          fireBaseAuth,
          completePhone,
          recaptchaVerifier
        );

        setConfirmationResult(confirmationResult);
      }
      setIsOTPOpen(true);
      reset();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

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
              id="country-select"
              value={
                sortedNumbers.find(
                  (option) => option.dialCode === field.value
                ) || null
              }
              options={sortedNumbers}
              getOptionLabel={(option) =>
                `${option.label}, +${option.dialCode}`
              }
              isOptionEqualToValue={(option, value) => {
                return option.dialCode === value.dialCode;
              }}
              noOptionsText={`Can't find? Search by dial-code`}
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
                      value: field.value
                        ? `+${field.value}`
                        : params.inputProps.value,
                    }}
                  />
                  <ErrorText error={errors.phone?.dialCode} />
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

  const inputFields = isEmailType ? <EmailInput /> : <PhoneInput />;

  return (
    <>
      <Dialog open={isAddContactOpen}>
        <DialogTitle>{title}</DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ borderBottom: 'none' }}>
            <DialogContentText>
              A one-time password (OTP) will be sent to your{' '}
              {isEmailType ? 'email address' : 'mobile number via SMS'}
            </DialogContentText>

            {inputFields}
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button type="button" disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>

            <FormSubmitButton label="Send OTP" isSubmitting={isSubmitting} />
          </DialogActions>
        </form>
      </Dialog>

      <div id="recaptcha-container"></div>

      {isOTPOpen && (
        <VerifyOTPDialog
          title={`Verify your ${email ? 'Email Address' : 'Mobile Number'}`}
          isOTPOpen={isOTPOpen}
          setIsOTPOpen={setIsOTPOpen}
          setIsAddContactOpen={setIsAddContactOpen}
          email={email}
          phoneDetails={phoneDetails}
          type={type}
          confirmationResult={confirmationResult}
        />
      )}
    </>
  );
};

export default AddContactDialog;
