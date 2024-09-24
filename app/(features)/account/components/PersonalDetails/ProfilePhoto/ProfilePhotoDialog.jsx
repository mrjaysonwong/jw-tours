import { useState } from 'react';
import { Dialog } from '@mui/material';

// local imports

import ProfilePhotoContent from './ProfilePhotoContent';
import AddPhotoContent from './AddPhotoContent';
import EditPhotoContent from './EditPhotoContent';
import { useMessageStore } from '@/stores/messageStore';
import { AlertMessage } from '@/components/alerts/Alerts';
import DeletePhotoDialog from './DeletePhotoDialog';

export default function ProfilePhotoDialog({ open, setOpen }) {
  const [isAddDialogOpen, setAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const { alert, handleClose } = useMessageStore();

  const handleOnClose = () => {
    setOpen(false);
  };

  const handleAddClick = () => {
    setAddDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <Dialog open={open}>
        {open &&
          (!isAddDialogOpen && !isEditDialogOpen ? (
            <ProfilePhotoContent
              handleAddClick={handleAddClick}
              handleOnClose={handleOnClose}
              handleDeleteClick={handleDeleteClick}
            />
          ) : isAddDialogOpen ? (
            <AddPhotoContent
              setAddDialogOpen={setAddDialogOpen}
              setEditDialogOpen={setEditDialogOpen}
              setSelectedImage={setSelectedImage}
            />
          ) : (
            isEditDialogOpen && (
              <EditPhotoContent
                setOpen={setEditDialogOpen}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            )
          ))}
      </Dialog>

      <DeletePhotoDialog
        open={isDeleteDialogOpen}
        setOpen={setDeleteDialogOpen}
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
