import { useContext } from 'react';
import Image from 'next/image';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

// local imports
import { setFileToBase64 } from '@/app/(features)/account/helpers/setFileToBase64';
import { UploadInput } from '@/components/styled/StyledInputs';
import { UserDataContext } from '@/contexts/UserProvider';
import { useMessageStore } from '@/stores/messageStore';

export default function AddPhotoContent(props) {
  const { user } = useContext(UserDataContext);
  const { setAddDialogOpen, setEditDialogOpen, setSelectedImage } = props;

  const { handleAlertMessage } = useMessageStore();

  const handleClose = () => {
    setAddDialogOpen(false);
  };

  const handleImage = (event) => {
    setFileToBase64(
      event,
      setEditDialogOpen,
      setSelectedImage,
      setAddDialogOpen,
      handleAlertMessage
    );
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
          {user?.firstName}, help others recognize you!{' '}
        </Typography>

        {!user?.image?.url ? (
          <Avatar
            src={user?.image?.url ?? '/assets/fallback_avatar.svg'}
            alt={`${user?.firstName} ${user?.lastName}`}
            referrerPolicy="no-referrer"
            sx={{ width: 168, height: 168 }}
          />
        ) : (
          <Box
            sx={{
              overflow: 'hidden',
              borderRadius: '50%',
              width: '168px',
              height: '168px',
            }}
          >
            <Image
              src={user?.image?.url ?? session?.user?.image}
              height={168}
              width={168}
              alt={`${user?.firstName} ${user?.lastName}`}
              style={{
                objectFit: 'cover',
              }}
              referrerPolicy="no-referrer"
            />
          </Box>
        )}

        <Typography variant="body2" sx={{ my: 2, color: 'gray' }}>
          Allowed format .JPG, .PNG
        </Typography>

        <Typography sx={{ my: 1, color: 'gray' }}>
          We require members to use their real identities, so upload a photo of
          yourself. Then crop and adjust it to perfection.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ mx: 'auto', py: 2 }}>
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload photo
          <UploadInput
            type="file"
            id="file-input-image"
            onChange={handleImage}
          />
        </Button>
      </DialogActions>
    </>
  );
}
