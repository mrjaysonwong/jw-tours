'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography, TextField, Grid, Box, Autocomplete } from '@mui/material';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// internal imports
import { useCheckoutContext } from '@/contexts/CheckoutProvider';
import { useUserSessionContext } from '@/contexts/UserProvider';
import { contactSchema } from '@/validation/yup/checkout/contactSchema';
import FormInput from '@/components/inputs/FormInput';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { countryData } from '@/data/countries/countryData';
import { API_URLS } from '@/constants/apiRoutes';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import ErrorText from '@/components/errors/ErrorText';

const Contact = () => {
  const checkout = useCheckoutContext();
  const phone = checkout?.contact?.phone;
  const session = useUserSessionContext();
  const router = useRouter();

  const { handleAlertMessage } = useMessageStore();

  const sortedNumbers = countryData.sort((a, b) => a.code - b.code);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(contactSchema) });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.CHECKOUTS}/${checkout._id}`;

      await axios.patch(url, formData);

      router.push(`/checkout/${checkout._id}/payment`);
    } catch (error) {
      const { errorMessage, status } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');

      if (status === 404) router.refresh();
    }
  };

  useEffect(() => {
    if (!checkout.meetingAndPickup) {
      router.replace(`/checkout/${checkout._id}/activity`);
    }
  }, [checkout, router]);

  return (
    <>
      <Typography variant="h5" color="primary">
        Enter your personal details
      </Typography>

      <Grid container spacing={2} sx={{ my: 0.5 }}>
        <Grid item xs={12} md={6}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              register={register}
              inputName="fullName"
              label="Full name"
              defaultValue={session.user.name}
              errors={errors.fullName}
            />

            <FormInput
              register={register}
              inputName="email"
              type="email"
              label="Email"
              defaultValue={session.user.email}
              errors={errors.email}
            />

            <Controller
              name="phone.dialCode"
              control={control}
              defaultValue={phone?.dialCode}
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
                />
              )}
            />

            <FormInput
              register={register}
              type="phone"
              inputName="phone.phoneNumber"
              defaultValue={phone?.phoneNumber}
              label="Phone Number"
              errors={errors.phone?.phoneNumber}
            />

            <Box sx={{ my: 2 }}>
              <FormSubmitButton
                fullWidth={true}
                label="Go to payment"
                isSubmitting={isSubmitting}
              />
            </Box>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default Contact;
