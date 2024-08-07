import React, { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
import { useMessageStore } from '@/stores/messageStore';
import Cropper from 'react-easy-crop';
import {
  Box,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Slider,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { CropperContainer, SliderContainer } from './styled';
import { getCroppedImg } from '@/app/[locale]/mysettings/components/personal-details/profile-photo/(image-handler)/getCroppedImg';
import axios from 'axios';
import { PersonalSettingsContext } from '../PersonalDetails';
import { errorHandler } from '@/utils/helper/errorHandler';
import { emptyFileInput } from '@/app/[locale]/mysettings/components/personal-details/profile-photo/(image-handler)/emptyFileInput';

export default function EditProfilePhotoDialog(props) {
  const { setOpenEdit, selectedImage, setSelectedImage } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const { refetch } = useContext(PersonalSettingsContext);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedImage, setCroppedImage] = useState(null);

  const { update } = useSession();

  const { handleAlertMessage } = useMessageStore();

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
      handleAlertMessage('An error occured. Try again.', 'error');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsSubmitting(true);

    try {
      const action = 'update-profilephoto';
      const url = `/api/account/details?action=${action}`;

      const { data } = await axios.patch(
        url,
        { croppedImage },
        { signal: AbortSignal.timeout(5000) }
      );

      emptyFileInput();
      refetch();
      setIsSubmitting(false);
      setOpenEdit(false);

      // Trigger update session
      update({});

      handleAlertMessage(data.statusText, 'success');
    } catch (error) {
      const { status } = errorHandler(error);
      handleAlertMessage('An error occured. Try again.', 'error');
      setIsSubmitting(false);
      setStatus(status);
    }
  };

  useEffect(() => {
    // update once crop change
  }, [croppedImage]);

  return (
    <>
      <Box sx={{ display: 'flex', position: 'relative' }}>
        <DialogTitle>Edit Photo</DialogTitle>
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
        {status > 299 ? (
          <Button variant="contained" color="error" onClick={handleClose}>
            Try again
          </Button>
        ) : (
          <>
            <Box component="form" encType="multipart/form-data">
              <Button
                variant="contained"
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                {isSubmitting ? (
                  <CircularProgress
                    aria-describedby="loading"
                    aria-busy={true}
                    size="1.5rem"
                  />
                ) : (
                  'Save Photo'
                )}
              </Button>
            </Box>
          </>
        )}
      </DialogActions>
    </>
  );
}
