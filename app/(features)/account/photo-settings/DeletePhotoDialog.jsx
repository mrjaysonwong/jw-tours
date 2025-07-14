import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';

// internal imports
import { useProfilePhotoContext } from '@/contexts/ProfilePhotoProvider';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/helpers/errorHelpers';
import { API_URLS } from '@/constants/apiRoutes';
import ConfirmationDialog from '@/components/dialogs/ConfirmationDialog';

const DeleteProfilePhotoDialog = ({ isDialogOpen, setIsDialogOpen }) => {
  const params = useParams();
  const { userId, refetch } = useProfilePhotoContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { update } = useSession();
  const { handleAlertMessage } = useMessageStore();

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const url = `${API_URLS.USERS}/${userId}/profile-photo`;

      const payload = { actionType: 'delete-photo' };
      const { data } = await axios.patch(url, payload);

      setIsDialogOpen(false);
      setIsSubmitting(false);

      if (!params.id) {
        // Trigger update session
        update({});
      }

      refetch();
      handleAlertMessage(data.message, 'success');
    } catch (error) {
      const { errorMessage } = errorHandler(error);
      setIsSubmitting(false);
      handleAlertMessage(errorMessage, 'error');
    }
  };

  return (
    <ConfirmationDialog
      title="Delete Photo"
      buttonLabel="Delete"
      type="photo"
      isDialogOpen={isDialogOpen}
      setIsDialogOpen={setIsDialogOpen}
      isSubmitting={isSubmitting}
      handleSubmit={handleSubmit}
    />
  );
};

export default DeleteProfilePhotoDialog;
