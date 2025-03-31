import FormData from 'form-data';
import axios from 'axios';

// internal imports
import { emptyFileInput } from '@/helpers/images/emptyFileInput';

function imageBlob(
  file,
  canvas,
  setEditDialogOpen,
  setSelectedImage,
  setUploadDialogOpen,
  handleAlertMessage,
  setIsSubmitting
) {
  canvas.toBlob(async (blob) => {
    const formData = new FormData();
    formData.append('media', blob, file.name);

    setIsSubmitting(true);

    try {
      const url = '/api/v1/image-moderation';
      const headers = {
        'Content-Type': 'multipart/form-data',
      };
      const { data } = await axios.post(url, formData, {
        headers,
      });

      if (data.summary.action === 'reject') {
        handleAlertMessage(
          'Inappropriate content detected. Please upload a different image.',
          'error'
        );
        emptyFileInput();
        setEditDialogOpen(false);
        setIsSubmitting(false);

        return;
      }

      const resizedImage = canvas.toDataURL(file.type);

      setEditDialogOpen(true);
      setSelectedImage(resizedImage);
      setUploadDialogOpen(false);
    } catch (error) {
      console.error('Image moderation error:', error);
      setEditDialogOpen(false);
      emptyFileInput();
      setIsSubmitting(false);
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  }, file.type);
}

export async function setFileToBase64({
  event,
  setEditDialogOpen,
  setSelectedImage,
  setUploadDialogOpen,
  handleAlertMessage,
  setIsSubmitting,
  isProfilePhoto,
  setUploadedImages,
  setValue,
  uploadedImages,
  uploadedFileNames,
  setUploadedFileNames
}) {
  const file = event.target.files[0];

  if (!file) {
    emptyFileInput();
    return;
  }

    // Check for duplicate file name
    if (!isProfilePhoto && uploadedFileNames.includes(file.name)) {
      handleAlertMessage('This image has already been uploaded.', 'error');
      emptyFileInput();
      return;
    }

  const allowedFileTypes = ['image/jpeg', 'image/png'];
  const maxWidth = 1200;
  const maxHeight = 630;

  if (!allowedFileTypes.includes(file.type)) {
    // Check for allowedFileType
    emptyFileInput();
    handleAlertMessage('File format must be .JPG or .PNG', 'error');
    return;
  }

  // builtin JavaScript api to read file and display contents
  const reader = new FileReader();

  reader.onloadend = async () => {
    const result = reader.result;

    const image = new Image();
    image.src = result;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      let newWidth = image.width;
      let newHeight = image.height;

      if (newWidth > maxWidth) {
        newWidth = maxWidth;
        newHeight = (maxWidth / image.width) * image.height;
      }

      if (newHeight > maxHeight) {
        newHeight = maxHeight;
        newWidth = (maxHeight / image.height) * image.width;
      }

      canvas.width = newWidth;
      canvas.height = newHeight;

      // 5 argument syntax to resize dimension
      // start x,y axis
      // destinationWidth, destinationHeight
      ctx.drawImage(image, 0, 0, newWidth, newHeight);

      if (isProfilePhoto) {
        imageBlob(
          file,
          canvas,
          setEditDialogOpen,
          setSelectedImage,
          setUploadDialogOpen,
          handleAlertMessage,
          setIsSubmitting
        );
      } else {
        const resizedImage = canvas.toDataURL(file.type);

        setSelectedImage(resizedImage);
        setUploadedImages((prev) => [...prev, resizedImage]);
        setUploadedFileNames((prev) => [...prev, file.name]);
        
        setValue('images', [...uploadedImages, resizedImage], {
          shouldValidate: true,
        });
      }
    };
  };

  // Error on Corrupt or Non-Readable File
  reader.onerror = () => {
    console.error('Error reading file');
    handleAlertMessage('Error reading file. Try again.', 'error');
  };

  reader.readAsDataURL(file);
}
