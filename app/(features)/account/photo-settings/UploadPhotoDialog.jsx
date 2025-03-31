import { useState } from 'react';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// internal imports
import { useProfilePhotoContext } from '@/contexts/ProfilePhotoProvider';
import { setFileToBase64 } from '@/helpers/images/setFileToBase64';
import { UploadInput } from '@/components/styled/StyledInputs';
import { useMessageStore } from '@/stores/messageStore';
import ProfileAvatar from '@/components/images/ProfileAvatar';

const UploadPhotoDialog = ({
  setUploadDialogOpen,
  setEditDialogOpen,
  setSelectedImage,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user } = useProfilePhotoContext();
  const isProfilePhoto = true;

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setUploadDialogOpen(false);
  };

  const handleImage = (event) => {
    setFileToBase64({
      event,
      setEditDialogOpen,
      setSelectedImage,
      setUploadDialogOpen,
      handleAlertMessage,
      setIsSubmitting,
      isProfilePhoto,
    });
  };

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle>Change Photo</DialogTitle>
        <IconButton
          onClick={handleClose}
          sx={{ position: 'absolute', right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>

      <DialogContent
        dividers
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          minHeight: '400px',
        }}
      >
        <Typography variant="h6" sx={{ my: 2 }}>
          {user?.firstName}, help others recognize you!
        </Typography>

        <ProfileAvatar user={user} w={168} h={168} />

        <Typography variant="body2" sx={{ my: 2, color: 'gray' }}>
          Allowed format .JPG, .PNG
        </Typography>

        <Typography sx={{ my: 1, color: 'gray' }}>
          We require members to use their real identities, so upload a photo of
          yourself. Then crop and adjust it to perfection.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ py: 2, display: 'flex', justifyContent: 'center' }}>
        <Button
          disabled={isSubmitting}
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          {isSubmitting ? 'Uploading...' : 'Upload photo'}
          <UploadInput
            type="file"
            id="file-input-image"
            onChange={handleImage}
          />
        </Button>
      </DialogActions>
    </>
  );
};

export default UploadPhotoDialog;
