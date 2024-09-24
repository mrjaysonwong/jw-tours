import React, { useState, useEffect, useContext } from 'react';
import { useSession } from 'next-auth/react';
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
import axios from 'axios';

// local imports
import { useMessageStore } from '@/stores/messageStore';
import { getCroppedImg } from '@/app/(features)/account/helpers/getCroppedImg';
import { UserDataContext } from '@/contexts/UserProvider';
import { errorHandler } from '@/helpers/errorHelpers';
import { emptyFileInput } from '@/app/(features)/account/helpers/emptyFileInput';

export default function EditPhotoContent(props) {
  const { setOpen, selectedImage, setSelectedImage } = props;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState('');

  const { refetch } = useContext(UserDataContext);

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
    setOpen(false);
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
      setOpen(false);

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
          height: '400px',
          width: { xs: '80vw', sm: '30vw' },
          position: 'relative',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: '80px',
          }}
        >
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
        </Box>

        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            width: '50%',
            transform: 'translateX(-50%)',
            height: 80,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Slider
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            aria-label="Zoom"
            onChange={(e, zoom) => onZoomChange(zoom)}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ mx: 'auto', py: 2 }}>
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
