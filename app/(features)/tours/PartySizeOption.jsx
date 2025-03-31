import { useCallback } from 'react';
import { Box, Typography, IconButton, TextField } from '@mui/material';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// internal imports
import { useTourDetails } from '@/contexts/TourDetailsProvider';

export const styledBox = {
  border: '1px solid',
  borderColor: 'divider',
  borderRadius: '32px',
  py: 0.5,
  mt: 1.5,
};

export const styledInput = {
  width: '145px',
  mr: 0.5,

  '& .MuiOutlinedInput-root': {
    borderRadius: '32px',
    bgcolor: 'rgba(169,169,169,0.1)',
  },
};

const PartySizeOption = ({ partySize, setPartySize }) => {
  const { tour } = useTourDetails();

  const handleChange = useCallback(
    (action) => {
      setPartySize((prev) => {
        const newPartySize = action === 'add' ? prev + 1 : prev - 1;
        return newPartySize;
      });
    },
    [setPartySize]
  );

  return (
    <Box sx={styledBox}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Typography sx={{ fontWeight: 500, ml: 2 }}>Party size:</Typography>

        <Box sx={{ ml: 'auto' }}>
          <TextField
            required
            size="small"
            value={partySize}
            sx={styledInput}
            inputProps={{
              style: { textAlign: 'center' },
            }}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <IconButton
                  disabled={partySize === tour.capacity.minSize}
                  onClick={() => handleChange('minus')}
                  sx={{ p: 0 }}
                >
                  <RemoveCircleOutlineOutlinedIcon />
                </IconButton>
              ),
              endAdornment: (
                <IconButton
                  disabled={partySize === tour.capacity.maxSize}
                  onClick={() => handleChange('add')}
                  sx={{ p: 0 }}
                >
                  <AddCircleOutlineOutlinedIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default PartySizeOption;
