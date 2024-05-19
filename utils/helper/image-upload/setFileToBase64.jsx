import { emptyFileInput } from './emptyFileInput';

export async function setFileToBase64(
  event,
  setOpenEdit,
  setSelectedImage,
  setOpenAdd
) {
  const file = event.target.files[0];

  const allowedFileTypes = ['image/jpeg', 'image/png'];
  const maxWidth = 1200;
  const maxHeight = 630;

  if (!allowedFileTypes.includes(file.type)) {
    // Check for allowedFileType
    emptyFileInput();
    alert('File format must be *.JPG or *.PNG', 'error');
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

      const resizedImage = canvas.toDataURL(file.type);

      setOpenEdit(true);
      setSelectedImage(resizedImage);
    };
  };

  if (file) {
    reader.readAsDataURL(file);

    setOpenEdit(true);
    setOpenAdd(false);
  } else {
    setSelectedImage(null);
  }
}
