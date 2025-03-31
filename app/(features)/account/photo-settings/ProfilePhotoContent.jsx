import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import DeleteIcon from '@mui/icons-material/Delete';

// internal imports
import { useProfilePhotoContext } from '@/contexts/ProfilePhotoProvider';
import ProfileAvatar from '@/components/images/ProfileAvatar';

const ProfilePhotoContent = ({
  handleAddClick,
  handleClose,
  handleDeleteClick,
}) => {
  const { user } = useProfilePhotoContext();
  const hasImage = user?.image?.url;

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle>Profile Photo</DialogTitle>
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
          justifyContent: 'center',
        }}
      >
        <Box
          sx={{
            overflow: 'hidden',
            borderRadius: '50%',
            width: '168px',
            height: '168px',
          }}
        >
          <ProfileAvatar user={user} h={168} w={168} />
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <Button
          variant="contained"
          onClick={handleAddClick}
          startIcon={<CameraEnhanceIcon />}
        >
          {hasImage ? 'Change Photo' : 'Add Photo'}
        </Button>

        <Button
          variant="outlined"
          onClick={handleDeleteClick}
          disabled={!hasImage}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </>
  );
};

export default ProfilePhotoContent;
