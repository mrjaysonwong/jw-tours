'use client';

import React, { useState } from 'react';
import { Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SearchDialog from './SearchDialog';

export default function SearchBar() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<SearchIcon />}
        onClick={handleClickOpen}
        sx={{ ml: 'auto', borderRadius: '12px' }}
      >
        Search Blog
      </Button>

      {open && <SearchDialog open={open} setOpen={setOpen} />}
    </>
  );
}
