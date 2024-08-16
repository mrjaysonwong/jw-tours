import React, { createContext, useContext } from 'react';
import { useSession } from 'next-auth/react';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Divider,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Name from './Name';
import Gender from './Gender';
import DateOfBirth from './DateOfBirth';
import Nationality from './Nationality';
import Address from './Address';
import { personalDetailsSchema } from '@/lib/validation/yup/personalDetailsSchema';
import { PersonalSettingsContext } from '../../../tabs/MySettingsTabs';
import axios from 'axios';
import { AlertMessage } from '@/app/components/custom/texts';
import { useMessageStore } from '@/stores/messageStore';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';

export const EditFormDetailsContext = createContext(null);

export default function EditFormDialog({ open, setOpen }) {
  const { user, refetch } = useContext(PersonalSettingsContext);

  const { update } = useSession();

  const { alert, handleAlertMessage, handleClose } = useMessageStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(personalDetailsSchema),
  });

  const handleOnClose = () => {
    setOpen(false);
  };

  const onSubmit = async (formData) => {
    try {
      const action = 'update-personaldetails';
      const url = `/api/account/details?action=${action}`;

      const { data } = await axios.patch(url, formData);

      refetch();
      setOpen(false);

      // Trigger update session
      update({});

      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  };

  const values = {
    user,
    register,
    control,
    errors,
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Update Personal Details</DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <form>
          <DialogContent sx={{ maxHeight: '60vh' }}>
            <Grid container spacing={3}>
              <EditFormDetailsContext.Provider value={values}>
                <Name />
                <Gender />
                <DateOfBirth />
                <Nationality />
                <Address />
              </EditFormDetailsContext.Provider>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={handleOnClose} disabled={isSubmitting}>
              Cancel
            </Button>

            <FormSubmitButton
              label="Update"
              action="update"
              handleSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
            />
          </DialogActions>
        </form>
      </Dialog>

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
