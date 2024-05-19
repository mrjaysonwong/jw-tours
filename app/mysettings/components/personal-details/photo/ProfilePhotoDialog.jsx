import { useContext, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import DeleteIcon from '@mui/icons-material/Delete';
import { DialogContext } from '../PersonalDetails';
import AddPhotoDialog from './AddPhotoDialog';
import EditProfilePhotoDialog from './EditProfilePhotoDialog';

function ProfilePhotoContent(props) {
  const { user, handleOnClick, handleClose } = props;

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle>Profile photo</DialogTitle>
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
          p: 5,
        }}
      >
        {!user?.image.url ? (
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.image.url}
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
              src={user?.image.url}
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
      </DialogContent>
      <DialogActions
        sx={{
          button: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: 'inherit',
            margin: 'auto',
          },

          svg: {
            marginLeft: 1.5,
          },
        }}
      >
        <Button onClick={handleOnClick} startIcon={<CameraEnhanceIcon />}>
          Add Photo
        </Button>
        <Button
          onClick={handleClose}
          disabled={!user?.image.url}
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      </DialogActions>
    </>
  );
}

export default function ProfilePhotoDialog() {
  const { user, open, setOpen } = useContext(DialogContext);
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOnClick = () => {
    setOpenAdd(true);
  };

  return (
    <>
      <Dialog open={open}>
        {open &&
          (!openAdd && !openEdit ? (
            <ProfilePhotoContent
              user={user}
              handleOnClick={handleOnClick}
              handleClose={handleClose}
            />
          ) : openAdd ? (
            <AddPhotoDialog
              user={user}
              setOpenEdit={setOpenEdit}
              setOpenAdd={setOpenAdd}
              setSelectedImage={setSelectedImage}
            />
          ) : (
            openEdit && (
              <EditProfilePhotoDialog
                setOpenEdit={setOpenEdit}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )
          ))}
      </Dialog>
    </>
  );
}
