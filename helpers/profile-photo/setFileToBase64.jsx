import FormData from 'form-data';
import axios from 'axios';

// internal imports
import { emptyFileInput } from './emptyFileInput';


export async function setFileToBase64(
  event,
  setEditDialogOpen,
  setSelectedImage,
  setUploadDialogOpen,
  handleAlertMessage
) {
  const file = event.target.files[0];

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

      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('media', blob, file.name);

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
          handleAlertMessage('An error occured. Try again.', 'error');
        }
      }, file.type);
    };
  };

  // Error on Corrupt or Non-Readable File
  reader.onerror = () => {
    console.error('Error reading file');
    handleAlertMessage('Error reading file. Try again.', 'error');
  };

  reader.readAsDataURL(file);
}
