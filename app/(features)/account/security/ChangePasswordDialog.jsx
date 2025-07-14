import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import { changePasswordSchema } from '@/validation/yup/user/passwordSchema';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import FormInput from '@/components/inputs/FormInput';
import { API_URLS } from '@/constants/apiRoutes';

const ChangePasswordDialog = ({ isDialogOpen, setIsDialogOpen, userId }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const { handleAlertMessage } = useMessageStore();

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleShowNewPassword = () => {
    setShowNewPassword((show) => !show);
  };

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({ resolver: yupResolver(changePasswordSchema) });

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.USERS}/${userId}/password`;

      const { data } = await axios.patch(url, formData);

      setIsDialogOpen(false);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <>
      <Dialog open={isDialogOpen} scroll="body">
        <DialogTitle>Change Password</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent
            dividers
            sx={{ borderBottom: 'none', width: { xs: 'auto', sm: '410px' } }}
          >
            <DialogContentText sx={{ mb: 2 }}>
              Set a strong password to prevent unauthorized access to your
              account.
            </DialogContentText>

            <FormInput
              register={register}
              inputName="currentPassword"
              type="password"
              label="Current Password"
              errors={errors.currentPassword}
              showPassword={showPassword}
              isNewPasswordField={false}
              handleShowPassword={handleShowPassword}
            />

            <FormInput
              register={register}
              inputName="newPassword"
              type="password"
              label="New Password"
              errors={errors.newPassword}
              showNewPassword={showNewPassword}
              isNewPasswordField={true}
              handleShowNewPassword={handleShowNewPassword}
            />

            <FormInput
              register={register}
              inputName="confirmNewPassword"
              type="password"
              label="Confirm New Password"
              errors={errors.confirmNewPassword}
              showNewPassword={showNewPassword}
              isNewPasswordField={true}
              handleShowNewPassword={handleShowNewPassword}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button type="button" disabled={isSubmitting} onClick={handleClose}>
              Cancel
            </Button>

            <FormSubmitButton
              label="Change Password"
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
            />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default ChangePasswordDialog;
