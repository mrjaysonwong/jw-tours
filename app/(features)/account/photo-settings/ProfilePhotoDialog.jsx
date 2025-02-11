import { useState } from 'react';
import { Dialog } from '@mui/material';

// internal imports
import { useProfilePhotoContext } from '@/contexts/ProfilePhotoProvider';
import {
  ProfilePhotoContent,
  UploadPhotoDialog,
  EditPhotoDialog,
  DeletePhotoDialog,
} from '@/app/(features)/account/photo-settings';
import { useMessageStore } from '@/stores/messageStore';
import AlertMessage from '@/components/alerts/AlertMessage';

const ProfilePhotoDialog = () => {
  const { open, setOpen } = useProfilePhotoContext();

  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const { alert, handleClose } = useMessageStore();

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleAddClick = () => {
    setUploadDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open} scroll="body" closeAfterTransition={false}>
        {open &&
          (!isUploadDialogOpen && !isEditDialogOpen ? (
            <ProfilePhotoContent
              handleAddClick={handleAddClick}
              handleOnClose={handleOnClose}
              handleDeleteClick={handleDeleteClick}
            />
          ) : isUploadDialogOpen ? (
            <UploadPhotoDialog
              setUploadDialogOpen={setUploadDialogOpen}
              setEditDialogOpen={setEditDialogOpen}
              setSelectedImage={setSelectedImage}
            />
          ) : (
            isEditDialogOpen && (
              <EditPhotoDialog
                setEditDialogOpen={setEditDialogOpen}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )
          ))}
      </Dialog>

      {isDeleteDialogOpen && (
        <DeletePhotoDialog
          open={isDeleteDialogOpen}
          setOpen={setDeleteDialogOpen}
        />
      )}

      <AlertMessage
        open={alert.open}
        message={alert.message}
        severity={alert.severity}
        onClose={handleClose}
      />
    </>
  );
};

export default ProfilePhotoDialog
