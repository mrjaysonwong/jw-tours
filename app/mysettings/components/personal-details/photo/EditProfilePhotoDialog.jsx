import React, { useState, useEffect } from 'react';
import Cropper from 'react-easy-crop';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Slider,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CropperContainer, SliderContainer } from './styled';
import { getCroppedImg } from '@/utils/helper/image-upload/getCroppedImg';

export default function EditProfilePhotoDialog(props) {
  const { setOpenEdit, selectedImage, setSelectedImage } = props;

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleClose = () => {
    setSelectedImage(null);
    setOpenEdit(false);
  };

  const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    try {
      const croppedImage = await getCroppedImg(
        selectedImage,
        croppedAreaPixels
      );

      setCroppedImage(croppedImage);
    } catch (error) {
      alert('An error occured. Try again.');
    }
  };

  useEffect(() => {
    // update once crop change
  }, [croppedImage]);

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle>Edit photo</DialogTitle>
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
          height: '450px',
          width: { xs: '70vw', md: '40vw' },
          position: 'relative',
        }}
      >
        <CropperContainer>
          <Cropper
            image={selectedImage}
            crop={crop}
            zoom={zoom}
            aspect={1}
            cropShape="round"
            showGrid={false}
            onCropChange={onCropChange}
            onCropComplete={onCropComplete}
            onZoomChange={onZoomChange}
          />
        </CropperContainer>

        <SliderContainer>
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-label="Zoom"
            onChange={(e, zoom) => onZoomChange(zoom)}
          />
        </SliderContainer>
      </DialogContent>
      <DialogActions sx={{ m: 'auto', py: 2 }}>
        <Button onClick={handleClose} variant="contained">
          Save photo
        </Button>
      </DialogActions>
    </>
  );
}
