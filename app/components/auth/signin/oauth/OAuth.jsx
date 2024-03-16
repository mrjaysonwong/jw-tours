import { Button, Typography, TextField, Box } from '@mui/material';
import { signIn } from 'next-auth/react';

export default function OAuth() {
  return (
    <>
      <Button
        fullWidth
        variant="contained"
        className="oauth btn-google"
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        Sign in with Google
      </Button>
      <Button
        fullWidth
        variant="contained"
        className="oauth btn-github"
        onClick={() => signIn('github', { callbackUrl: '/' })}
      >
        Sign in with Github
      </Button>
      <Button fullWidth variant="contained" className="oauth btn-facebook">
        Sign in with Facebook
      </Button>
    </>
  );
}
