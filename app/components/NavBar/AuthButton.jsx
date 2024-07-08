import { signIn } from 'next-auth/react';
import { IconButton } from '@mui/material';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';

export default function AuthButton() {
  return (
    <>
      <IconButton disableRipple onClick={() => signIn()} sx={{ mx: 0 }}>
        <AccountCircleOutlinedIcon />
      </IconButton>
    </>
  );
}
