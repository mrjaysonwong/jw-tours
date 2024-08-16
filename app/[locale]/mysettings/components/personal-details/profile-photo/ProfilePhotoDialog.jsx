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
  Divider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CameraEnhanceIcon from '@mui/icons-material/CameraEnhance';
import DeleteIcon from '@mui/icons-material/Delete';
import { PersonalSettingsContext } from '../../tabs/MySettingsTabs';
import AddPhotoDialog from './AddPhotoDialog';
import EditProfilePhotoDialog from './EditProfilePhotoDialog';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/app/components/custom/texts';
import DeleteProfilePhotoDialog from './DeleteProfilePhotoDialog';

function ProfilePhotoContent(props) {
  const { user } = useContext(PersonalSettingsContext);
  const { handleOnClickAdd, handleOnClose, handleOnClickDelete } = props;

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
          p: 5,
        }}
      >
        {!user?.image?.url ? (
          <Avatar
            alt={`${user?.firstName} ${user?.lastName}`}
            src={user?.image?.url ?? '/assets/user.png'}
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
              src={user?.image?.url}
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
        <Button onClick={handleOnClickAdd} startIcon={<CameraEnhanceIcon />}>
          {user?.image?.url ? 'Change Photo' : 'Add Photo'}
        </Button>

        <Divider orientation="vertical" variant="middle" flexItem />
        <Button
          onClick={handleOnClickDelete}
          disabled={!user?.image?.url}
          startIcon={<DeleteIcon />}
        >
          Delete Photo
        </Button>
      </DialogActions>
    </>
  );
}

export default function ProfilePhotoDialog({ open, setOpen }) {
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const { alert, handleClose } = useMessageStore();

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleOnClickAdd = () => {
    setOpenAdd(true);
  };

  const handleOnClickDelete = () => {
    setOpenDelete(true);
  };

  return (
    <>
      <Dialog open={open}>
        {open &&
          (!openAdd && !openEdit ? (
            <ProfilePhotoContent
              handleOnClickAdd={handleOnClickAdd}
              handleOnClose={handleOnClose}
              handleOnClickDelete={handleOnClickDelete}
            />
          ) : openAdd ? (
            <AddPhotoDialog
              setOpenAdd={setOpenAdd}
              setOpenEdit={setOpenEdit}
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

      <DeleteProfilePhotoDialog
        open={openDelete}
        setOpenDelete={setOpenDelete}
      />

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
}
