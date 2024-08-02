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
import { setFileToBase64 } from '@/app/mysettings/components/personal-details/profile-photo/(image-handler)/setFileToBase64';
import { StyledInput as UploadInput } from './styled';
import { PersonalSettingsContext } from '../PersonalDetails';
import { useMessageStore } from '@/stores/messageStore';

export default function AddPhotoDialog(props) {
  const { user } = useContext(PersonalSettingsContext);
  const { setOpenAdd, setOpenEdit, setSelectedImage } = props;

  const { handleAlertMessage } = useMessageStore();

  const handleOnClose = () => {
    setOpenAdd(false);
  };

  const handleImage = (event) => {
    setFileToBase64(
      event,
      setOpenEdit,
      setSelectedImage,
      setOpenAdd,
      handleAlertMessage
    );
  };

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle>Change Photo</DialogTitle>
        <IconButton
          onClick={handleOnClose}
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
        }}
      >
        <Typography variant="h6" sx={{ my: 2 }}>
          {user?.firstName}, help others recognize you!{' '}
        </Typography>

        {!user?.image?.url ? (
          <Avatar
            src={user?.image?.url ?? '/assets/user.png'}
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
          We require members to use their real identities, so take or upload a
          photo of yourself. Then crop and adjust it to perfection.
        </Typography>
      </DialogContent>
      <DialogActions
        sx={{
          m: 'auto',
          py: 2,
        }}
      >
        <Button
          component="label"
          variant="contained"
          startIcon={<CloudUploadIcon />}
        >
          Upload file
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
