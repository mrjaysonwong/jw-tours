import React, { useState } from 'react';
import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// interal imports
import SearchBar from './SearchBar';

const SearchDialog = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <IconButton onClick={handleOpen}>
        <SearchIcon />
      </IconButton>

      <Dialog
        fullScreen
        closeAfterTransition={false}
        open={open}
        onClose={handleClose}
      >
        <AppBar
          position="sticky"
          color="default"
          elevation={0}
          sx={{ borderBottom: 1, borderColor: 'divider' }}
        >
          <Toolbar>
            <Typography variant="h6" sx={{ flex: 1 }}>
              Search
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ mx: 'auto', my: 2, px: 2, width: '100%' }}>
          <SearchBar w="auto" handleClose={handleClose} />
        </Box>
      </Dialog>
    </>
  );
};

export default SearchDialog;
