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
import axios from 'axios';

// local imports
import { emailSchema } from '@/helpers/validation/yup/schemas/personalDetailsSchema';
import { ErrorText } from '@/components/errors/ErrorTexts';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';

export default function AddEmailDialog(props) {
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

        <form>
          <DialogContent dividers sx={{ borderBottom: 'none' }}>
            <DialogContentText sx={{ mb: 3 }}>
              A one-time password (OTP) will be sent to your email address.
            </DialogContentText>

            <TextField
              {...register('email')}
              fullWidth
              size="small"
              label="Email address"
              name="email"
              error={!!errors.email}
              autoComplete="on"
            />

            <ErrorText error={errors.email} />
            
          </DialogContent>

          <DialogActions sx={{ mx: 2, py: 2 }}>
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
