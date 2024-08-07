import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Divider,
  TextField,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { emailSchema } from '@/lib/validation/yup/personalDetailsSchema';
import { ErrorText } from '@/utils/helper/form-text/ErrorText';
import axios from 'axios';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';

export default function AddEmailForm(props) {
  const { open, setOpen, setOpenOTP, setEmail } = props;

  const { handleAlertMessage } = useMessageStore();

  const {
    register,
    control,
    handleSubmit,
    resetField,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(emailSchema),
  });

  const handleClose = () => {
    setOpen(false);
    resetField('email');
  };

  const onSubmit = async (formData) => {
    try {
      const url = `/api/account/email`;

      const { data } = await axios.post(url, formData);

      setOpenOTP(true);
      setOpen(false);
      setEmail(formData.email);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Add Email Address</DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <form>
          <DialogContent>
            <DialogContentText sx={{ mb: 3 }}>
              A one-time password (OTP) will be sent to your email address.
            </DialogContentText>
            <TextField
              {...register('email')}
              fullWidth
              label="Email address"
              name="email"
              error={!!errors.email}
              autoComplete="on"
            />

            {errors.email && <ErrorText error={errors.email} />}
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
