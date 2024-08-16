import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Divider,
  TextField,
  Autocomplete,
  Box,
  Grid,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { phoneNumberSchema } from '@/lib/validation/yup/personalDetailsSchema';
import { ErrorText } from '@/utils/helper/form-text/ErrorText';
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { phoneNumbers } from '@/src/countries/phoneNumbers';

export default function AddMobileDialog(props) {
  const { open, setOpen, setOpenOTP, setCompletePhone } = props;

  const { handleAlertMessage } = useMessageStore();

  const sortedNumbers = phoneNumbers.sort((a, b) => a.code - b.code);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(phoneNumberSchema),
  });

  const handleClose = () => {
    setOpen(false);
    reset({
      phone: {
        dialCode: '',
        phoneNumber: '',
      },
    });
  };

  const onSubmit = async (formData) => {
    try {
      const { dialCode, phoneNumber } = formData.phone;

      const url = `/api/account/mobile`;

      const { data } = await axios.post(url, formData);

      setOpenOTP(true);
      setOpen(false);
      setCompletePhone({ phone: { dialCode, phoneNumber } });
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Add Mobile Number</DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <form>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              A one-time password (OTP) will be sent to your mobile number via
              SMS.
            </DialogContentText>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={7} md={7}>
                <Autocomplete
                  id="country-select"
                  options={sortedNumbers}
                  noOptionsText={`Can't find? Search by dial-code`}
                  autoHighlight
                  getOptionLabel={(option) => `+${option.dialCode}`}
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
                        {...register('phone.dialCode')}
                        name="phone.dialCode"
                        label="Country Dial-code"
                        error={!!errors.phone?.dialCode}
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: 'off',
                        }}
                      />

                      {errors.phone?.dialCode && (
                        <ErrorText error={errors.phone?.dialCode} />
                      )}
                    </>
                  )}
                />
              </Grid>

              <Grid item xs={12} sm={5} md={5}>
                <TextField
                  {...register('phone.phoneNumber')}
                  fullWidth
                  label="Mobile Number"
                  name="phone.phoneNumber"
                  error={!!errors.phone?.phoneNumber}
                  inputProps={{ maxLength: 100 }}
                />

                {errors.phone?.phoneNumber && (
                  <ErrorText error={errors.phone?.phoneNumber} />
                )}
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ m: 2 }}>
            <Button disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>

            <FormSubmitButton
              label="Add"
              action="add"
              handleSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
