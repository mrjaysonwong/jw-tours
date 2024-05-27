import React, { useState, useEffect, useContext } from 'react';
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
import { getCroppedImg } from '@/app/mysettings/components/personal-details/photo/(image-handler)/getCroppedImg';
import axios from 'axios';
import { DialogContext } from '../PersonalDetails';
import { useMessageStore } from '@/stores/messageStore';
import { errorHandler } from '@/utils/helper/errorHandler';
import { emptyFileInput } from '@/app/mysettings/components/personal-details/photo/(image-handler)/emptyFileInput';

// review

export default function EditProfilePhotoDialog(props) {
  const { setOpenEdit, selectedImage, setSelectedImage } = props;
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const { userId, refetch } = useContext(DialogContext);
  const { handleAlertMessage } = useMessageStore();

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropChange = (crop) => {
    setCrop(crop);
  };

  const onZoomChange = (zoom) => {
    setZoom(zoom);
  };

  const handleOnClose = () => {
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
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);

    try {
      const mode = 'update-profilephoto';
      const url = `/api/users?userId=${userId}&mode=${mode}`;

      const { data } = await axios.patch(
        url,
        { croppedImage },
        { signal: AbortSignal.timeout(5000) }
      );

      emptyFileInput();
      refetch();
      setLoading(false);
      handleAlertMessage(data.message, 'success');
      setOpenEdit(false);
    } catch (error) {
      const { errorMessage, status } = errorHandler(error);
      handleAlertMessage(errorMessage, 'error');
      setStatus(status);
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
        {status > 299 ? (
          <Button variant="contained" color="error" onClick={handleOnClose}>
            Try again
          </Button>
        ) : (
          <>
            <Box
              component="form"
              encType="multipart/form-data"
              onSubmit={handleOnSubmit}
            >
              <Button variant="contained" type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save Photo'}
              </Button>
            </Box>
          </>
        )}
      </DialogActions>
    </>
  );
}
