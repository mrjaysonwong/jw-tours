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

const ProfilePhotoDialog = () => {
  const { isDialogOpen, setIsDialogOpen } = useProfilePhotoContext();

  const [isUploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => {
    setIsDialogOpen(false);
  };

  const handleAddClick = () => {
    setUploadDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  return (
    <>
      <Dialog open={isDialogOpen} scroll="body" closeAfterTransition={false}>
        {isDialogOpen &&
          (!isUploadDialogOpen && !isEditDialogOpen ? (
            <ProfilePhotoContent
              handleAddClick={handleAddClick}
              handleClose={handleClose}
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
          isDialogOpen={isDeleteDialogOpen}
          setIsDialogOpen={setDeleteDialogOpen}
        />
      )}
    </>
  );
};

export default ProfilePhotoDialog;
