import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import FormInput from '@/components/inputs/FormInput';
import { passwordSchema } from '@/validation/yup/user/passwordSchema';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { errorHandler } from '@/helpers/errorHelpers';
import { useMessageStore } from '@/stores/messageStore';
import { API_URLS } from '@/constants/apiRoutes';
import VerifyOTPDialog from './VerifyOTPDialog';

const TwoFactorAuthDialog = ({
  title,
  isDialogOpen,
  setDialogState,
  isSubmitSuccessful,
  selected,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  const [isOTPOpen, setIsOTPOpen] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleClose = () => {
    setDialogState({ open: false });
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(passwordSchema) });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.ADMIN}/auth/send-otp`;

      await axios.post(url, formData);

      setIsOTPOpen(true);
      setPassword(formData.password);
      reset();
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen}>
        <DialogTitle>{title}</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ borderBottom: 'none' }}>
            <DialogContentText>Please enter your password.</DialogContentText>
            <DialogContentText sx={{ mb: 2 }}>
              Once verified, an OTP will be sent to your email.
            </DialogContentText>

            <FormInput
              register={register}
              inputName="password"
              type="password"
              label="Password"
              errors={errors.password}
              showPassword={showPassword}
              handleShowPassword={handleShowPassword}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button
              onClick={handleClose}
              disabled={isSubmitting || isSubmitSuccessful}
            >
              Cancel
            </Button>

            <FormSubmitButton label="Send OTP" isSubmitting={isSubmitting} />
          </DialogActions>
        </form>
      </Dialog>

      {isOTPOpen && (
        <VerifyOTPDialog
          title="2FA - Account Deletion"
          isOTPOpen={isOTPOpen}
          setIsOTPOpen={setIsOTPOpen}
          setDialogState={setDialogState}
          type="2FA-account-deletion"
          selected={selected}
          password={password}
        />
      )}
    </>
  );
};

export default TwoFactorAuthDialog;
