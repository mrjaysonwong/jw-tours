import React, { createContext, useContext, useState } from 'react';
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
import { PersonalSettingsContext } from '../../PersonalDetails';
import axios from 'axios';
import { AlertMessage } from '@/app/components/custom/messages';
import { useMessageStore } from '@/stores/messageStore';
import FormSubmitButton from '@/app/components/custom/buttons/FormSubmitButton';
import { sleep } from '@/utils/helper/common';

export const DetailsEditFormContext = createContext(null);

export default function DetailsEditForm({ open, setOpen }) {
  const { user, refetch } = useContext(PersonalSettingsContext);

  const [hasError, setHasError] = useState(false);

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
    setHasError(false);
  };

  const onSubmit = async (formData) => {
    await sleep(1000);

    try {
      const mode = 'update-personaldetails';
      const url = `/api/users?userId=${user._id}&mode=${mode}`;

      const { data } = await axios.patch(url, formData);

      refetch();
      handleAlertMessage(data.message, 'success');
      setOpen(false);
      setHasError(false);
    } catch (error) {
      setHasError(true);
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
        <DialogTitle>Update Personal details</DialogTitle>

        <Divider sx={{ mx: 3 }} />

        <form>
          <DialogContent sx={{ maxHeight: '60vh' }}>
            <Grid container spacing={3}>
              <DetailsEditFormContext.Provider value={values}>
                <Name />
                <Gender />
                <DateOfBirth />
                <Nationality />
                <Address />
              </DetailsEditFormContext.Provider>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ m: 2 }}>
            <Button onClick={handleOnClose} disabled={isSubmitting}>
              Cancel
            </Button>

            <FormSubmitButton
              label="Update"
              mode="update"
              handleSubmit={handleSubmit(onSubmit)}
              isSubmitting={isSubmitting}
              isSubmitSuccessful={isSubmitSuccessful}
              hasError={hasError}
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
