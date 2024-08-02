import React, { useContext } from 'react';
import { Typography } from '@mui/material';
import { UserSessionContext } from '@/context/UserSessionWrapper';

export default function Preferences() {
  const session = useContext(UserSessionContext);

  return (
    <>
      <Typography variant="h5">Preferences</Typography>
      <Typography>This is a translation text</Typography>
      <Typography>{session?.user?.email}</Typography>
    </>
  );
}
