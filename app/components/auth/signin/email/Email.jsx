import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendEmailLink from './SendEmailLink';

export default function Email() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Button
        fullWidth
        variant="contained"
        className=" btn-email"
        onClick={handleClickOpen}
      >
        Sign in with Email
      </Button>
      <SendEmailLink open={open} setOpen={setOpen} />
    </>
  );
}
