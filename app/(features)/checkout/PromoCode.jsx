'use client';
import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  InputAdornment,
  Typography,
} from '@mui/material';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';

// internal imports

const PromoCode = () => {
  return (
    <>
      <TextField
        fullWidth
        margin="dense"
        placeholder="Enter Promo Code"
        autoComplete="off"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Button variant="contained">Apply</Button>
            </InputAdornment>
          ),
        }}
      />
    </>
  );
};

export default PromoCode;
