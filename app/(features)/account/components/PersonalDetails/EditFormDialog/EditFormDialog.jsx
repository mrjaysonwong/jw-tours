import React, { useContext } from 'react';
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
import axios from 'axios';

// local imports
import Name from './Name';
import Gender from './Gender';
import DateOfBirth from './DateOfBirth';
import Nationality from './Nationality';
import Address from './Address';
import { personalDetailsSchema } from '@/helpers/validation/yup/schemas/personalDetailsSchema';
import { UserDataContext } from '@/contexts/UserProvider';
import { AlertMessage } from '@/components/alerts/Alerts';
import { useMessageStore } from '@/stores/messageStore';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { EditDetailsProvider } from '@/app/(features)/account/contexts/EditDetailsProvider';

export default function EditFormDialog({ open, setOpen }) {
  const { user, refetch } = useContext(UserDataContext);
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

  const editDetailsContextValues = {
    user,
    register,
    control,
    errors,
  };

  return (
    <>
      <Dialog open={open}>
        <DialogTitle>Update Personal Details</DialogTitle>

        <form>
          <DialogContent dividers sx={{ py: 3, borderBottom: 'none' }}>
            <Grid container spacing={3}>
              <EditDetailsProvider value={editDetailsContextValues}>
                <Name />
                <Gender />
                <DateOfBirth />
                <Nationality />
                {/* <Address /> */}
              </EditDetailsProvider>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ mx: 2, py: 2 }}>
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
