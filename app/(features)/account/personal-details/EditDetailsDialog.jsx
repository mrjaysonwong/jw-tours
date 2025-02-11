import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import {
  Grid,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';

// internal imports
import { Name, Gender, DateOfBirth, Nationality, Address, Role } from './index';
import { personalDetailsSchema } from '@/validation/yup/user/personalDetailsSchema';
import { useUserDetailsContext } from '@/contexts/UserProvider';
import AlertMessage from '@/components/alerts/AlertMessage';
import { useMessageStore } from '@/stores/messageStore';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { EditUserDetailsProvider } from '@/app/(features)/account/contexts/EditUserDetailsProvider';
import { API_URLS } from '@/constants/api';

const EditDetailsDialog = ({ open, setOpen }) => {
  const params = useParams();
  const { userId, user, refetch, adminRefetch } = useUserDetailsContext();

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
      const url = `${API_URLS.USERS}/${userId}/personal-details`;

      const { data } = await axios.patch(url, formData);

      if (params.id) {
        adminRefetch();
      } else {
        refetch();
        // Trigger update session
        update({});
      }

      setOpen(false);
      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  };

  const contextValues = {
    user,
    register,
    control,
    errors,
  };

  return (
    <>
      <Dialog open={open} scroll="body">
        <DialogTitle>Update Personal Details</DialogTitle>

        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent dividers sx={{ py: 3, borderBottom: 'none' }}>
            <Grid container columnSpacing={1}>
              <EditUserDetailsProvider value={contextValues}>
                <Name />
                {params.id && <Role />}
                <Gender />
                <DateOfBirth />
                <Nationality />
                <Address />
              </EditUserDetailsProvider>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ mx: 2, py: 2 }}>
            <Button
              type="button"
              onClick={handleOnClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>

            <FormSubmitButton
              label="Update"
              action="update"
              isSubmitting={isSubmitting}
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
};

export default EditDetailsDialog;
