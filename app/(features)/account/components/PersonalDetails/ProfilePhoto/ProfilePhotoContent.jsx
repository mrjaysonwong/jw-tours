import { useContext } from 'react';
import Image from 'next/image';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import DeleteIcon from '@mui/icons-material/Delete';

// local imports
import { UserDataContext } from '@/contexts/UserProvider';

export default function ProfilePhotoContent(props) {
  const { user } = useContext(UserDataContext);
  const { handleAddClick, handleOnClose, handleDeleteClick } = props;

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle>Profile Photo</DialogTitle>
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
          {!user?.image?.url ? (
            <Avatar
              alt={`${user?.firstName} ${user?.lastName}`}
              src="/assets/fallback_avatar.svg"
              referrerPolicy="no-referrer"
              sx={{ width: 168, height: 168 }}
            />
          ) : (
            <Image
              src={user?.image?.url}
              height={168}
              width={168}
              alt={`${user?.firstName} ${user?.lastName}`}
              style={{
                objectFit: 'cover',
              }}
              priority
              quality={90}
              referrerPolicy="no-referrer"
            />
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ m: 1 }}>
        <Button onClick={handleAddClick} startIcon={<CameraEnhanceIcon />}>
          {user?.image?.url ? 'Change Photo' : 'Add Photo'}
        </Button>

        <Button
          onClick={handleDeleteClick}
          disabled={!user?.image?.url}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </>
  );
}
