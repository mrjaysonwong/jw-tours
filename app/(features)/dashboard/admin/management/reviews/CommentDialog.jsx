import React from 'react';
import { Typography, Dialog, DialogTitle, DialogContent } from '@mui/material';

const CommentDialog = ({ open, comment, reviewer, onClose }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      closeAfterTransition={false}
    >
      <DialogTitle>Full Comment</DialogTitle>
      <DialogContent>
        <Typography>&quot;{comment}&quot;</Typography>
      </DialogContent>
      <DialogContent sx={{ textAlign: 'right', overflowY: 'visible' }}>
        <Typography>- {reviewer}</Typography>
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(CommentDialog);
