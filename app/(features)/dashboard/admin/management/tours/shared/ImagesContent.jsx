import React, { useEffect, useRef } from 'react';
import { Box, Button, Tooltip, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

// internal imports
import { useTourFormContext } from './CardForm';
import { UploadInput } from '@/components/styled/StyledInputs';
import { setFileToBase64 } from '@/helpers/images/setFileToBase64';
import { emptyFileInput } from '@/helpers/images/emptyFileInput';
import ErrorText from '@/components/errors/ErrorText';
import { useMessageStore } from '@/stores/messageStore';

const ImagesContent = () => {
  const { errors, imagesFields, appendImages, removeImages, setValue, tour } =
    useTourFormContext();
  const imagesRef = useRef(null);

  const { handleAlertMessage } = useMessageStore();


  const handleImage = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const isDuplicate = imagesFields.some(
      (field) => field.fileName === file.name
    );

    setFileToBase64({
      event,
      onSuccess: (base64Image) => {
        appendImages({ url: base64Image, fileName: file.name });
      },
      isDuplicate,
      handleAlertMessage,
    });
  };

  const handleRemove = (index) => {
    removeImages(index);
    emptyFileInput();
  };

  // Initialize images value
  useEffect(() => {
    if (tour && tour?.images && !imagesFields.length) {
      const dbImages = tour.images.map((img) => ({ url: img.url }));

      setValue('images', dbImages);
    }
  }, [tour, setValue, imagesFields.length]);

  useEffect(() => {
    if (errors.images && imagesRef.current) {
      imagesRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [errors.images]);

  return (
    <>
      <Box
        ref={imagesRef}
        sx={{
          width: '100%',
          height: 150,
          my: 1,
          border: '1px solid',
          borderColor: errors?.images ? '#f44336' : 'divider',
          borderStyle: 'dotted dashed',
        }}
      >
        <Button
          fullWidth
          component="label"
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CloudUploadIcon sx={{ height: 48, width: 48 }} />
          <UploadInput
            type="file"
            id="file-input-image"
            onChange={handleImage}
            disabled={imagesFields.length >= 9}
          />
          Upload images
        </Button>
      </Box>

      {errors?.images && (
        <Box sx={{ my: 1 }}>
          <ErrorText error={errors?.images?.message} />
        </Box>
      )}

      {imagesFields.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            my: 2,
          }}
        >
          {imagesFields.map((field, index) => {
            return (
              <Box key={field.id} sx={{ position: 'relative' }}>
                <Tooltip
                  title={`image-${index + 1}`}
                  arrow
                  slotProps={{
                    popper: {
                      modifiers: [
                        {
                          name: 'offset',
                          options: {
                            offset: [0, -15],
                          },
                        },
                      ],
                    },
                  }}
                >
                  <img
                    src={field.url}
                    alt={`image-${index + 1}`}
                    style={{
                      width: '80px',
                      height: '80px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                    }}
                  />
                </Tooltip>
                <IconButton
                  onClick={() => handleRemove(index)}
                  sx={{
                    position: 'absolute',
                    left: 55,
                    top: 2,
                    p: '3px',
                    m: 0,
                    bgcolor: 'rgba(0,0,0,0.2)',
                  }}
                >
                  <ClearIcon sx={{ fontSize: '1rem', color: 'white' }} />
                </IconButton>
              </Box>
            );
          })}
        </Box>
      )}
    </>
  );
};

export default ImagesContent;
