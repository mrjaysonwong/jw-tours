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
import {
  Name,
  Gender,
  DateOfBirth,
  Nationality,
  Languages,
  Address,
  Role,
} from '.';
import { personalDetailsSchema } from '@/validation/yup/user/personalDetailsSchema';
import { useUserDetailsContext } from '@/contexts/UserProvider';
import { useMessageStore } from '@/stores/messageStore';
import FormSubmitButton from '@/components/buttons/FormSubmitButton';
import { EditUserDetailsProvider } from '@/contexts/EditUserDetailsProvider';
import { API_URLS } from '@/constants/apiRoutes';

const EditDetailsDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const params = useParams();
  const { userId, user, refetch } = useUserDetailsContext();

  const { update } = useSession();
  const { handleAlertMessage } = useMessageStore();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(personalDetailsSchema),
  });

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const onSubmit = async (formData) => {
    try {
      const url = `${API_URLS.USERS}/${userId}/personal-details`;

      const { data } = await axios.patch(url, formData);

      if (!params.id) {
        // Trigger update session
        update({});
      }

      refetch();
      setIsDialogOpen(false);
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  };

  const contextValues = {
    user,
    register,
    control,
    errors,
    params,
  };

  return (
    <>
      <Dialog open={isDialogOpen} scroll="body" closeAfterTransition={true}>
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
                <Languages />
                <Address />
              </EditUserDetailsProvider>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ px: 3, py: 2 }}>
            <Button type="button" onClick={handleClose} disabled={isSubmitting}>
              Cancel
            </Button>

            <FormSubmitButton label="Update" isSubmitting={isSubmitting} />
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default EditDetailsDialog;
