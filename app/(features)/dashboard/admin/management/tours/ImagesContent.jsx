import React, { useState } from 'react';
import { Box, Button, Tooltip, IconButton } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ClearIcon from '@mui/icons-material/Clear';

// internal imports
import { useCreateTourContext } from '@/contexts/CreateNewTourProvider';
import { UploadInput } from '@/components/styled/StyledInputs';
import { setFileToBase64 } from '@/helpers/images/setFileToBase64';
import { emptyFileInput } from '@/helpers/images/emptyFileInput';
import ErrorText from '@/components/errors/ErrorText';
import { useMessageStore } from '@/stores/messageStore';

const ImagesContent = ({
  uploadedImages,
  setUploadedImages,
  uploadedFileNames,
  setUploadedFileNames,
}) => {
  const { errors, setValue } = useCreateTourContext();
  const [selectedImage, setSelectedImage] = useState(null);
  const { handleAlertMessage } = useMessageStore();

  const handleImage = (event) => {
    setFileToBase64({
      event,
      setSelectedImage,
      setUploadedImages: (newImages) => {
        setUploadedImages(newImages);
        setValue('images', [newImages], {
          shouldValidate: true,
        });
      },
      handleAlertMessage,
      setValue,
      uploadedImages,
      uploadedFileNames,
      setUploadedFileNames,
    });
  };

  const handleClick = (event, index) => {
    const updatedImages = uploadedImages.filter((_, i) => i !== index);
    const updatedFileNames = uploadedFileNames.filter((_, i) => i !== index);

    setUploadedImages(updatedImages);
    setUploadedFileNames(updatedFileNames);
    setValue('images', updatedImages.length > 0 ? updatedImages : undefined, {
      shouldValidate: true,
    });

    emptyFileInput();
  };

  return (
    <>
      <Box
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
          />
          Upload images
        </Button>
      </Box>

      {errors?.images && (
        <Box sx={{ my: 1 }}>
          <ErrorText error={errors?.images?.message} />
        </Box>
      )}

      {uploadedImages.length > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 1,
            my: 2,
          }}
        >
          {uploadedImages.map((image, index) => (
            <Box key={index} sx={{ position: 'relative' }}>
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
                  key={index}
                  src={image}
                  alt={`image-${index + 1}`}
                  style={{
                    width: '90px',
                    height: '90px',
                    objectFit: 'cover',
                    borderRadius: '6px',
                  }}
                />
              </Tooltip>
              <IconButton
                onClick={(e) => handleClick(e, index)}
                sx={{
                  position: 'absolute',
                  left: 65,
                  top: 2,
                  p: '3px',
                  m: 0,
                  bgcolor: 'rgba(0,0,0,0.2)',
                }}
              >
                <ClearIcon sx={{ fontSize: '1rem', color: 'white' }} />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}
    </>
  );
};

ImagesContent.displayName = 'ImagesContent';
export default React.memo(ImagesContent);
