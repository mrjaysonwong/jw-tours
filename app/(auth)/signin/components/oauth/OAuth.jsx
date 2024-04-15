import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { IconButton, Tooltip } from '@mui/material';

export default function OAuth() {
  return (
    <>
      <Tooltip title="Sign in with Google" placement="bottom-start">
        <IconButton
          className="oauth btn-google"
          onClick={() => {
            localStorage.setItem('signed-in', 'true');
            signIn('google');
          }}
        >
          <Image
            src={'/assets/oauth/google.svg'}
            width={32}
            height={32}
            priority
            alt="image-google"
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="Sign in with GitHub" placement="bottom-start">
        <IconButton
          className="oauth btn-github"
          onClick={() => {
            localStorage.setItem('signed-in', 'true');
            signIn('github');
          }}
        >
          <Image
            src={'/assets/oauth/github.svg'}
            width={32}
            height={32}
            priority
            alt="image-github"
          />
        </IconButton>
      </Tooltip>

      <Tooltip title="Sign in with Facebook" placement="bottom-start">
        <IconButton
          className="oauth btn-facebook"
          onClick={() => {
            localStorage.setItem('signed-in', 'true');
            signIn('facebook');
          }}
        >
          <Image
            src={'/assets/oauth/facebook.svg'}
            width={32}
            height={32}
            priority
            alt="image-facebook"
          />
        </IconButton>
      </Tooltip>

      <Tooltip
        title="Sign in with Email (recommended)"
        placement="bottom-start"
      >
        <Link href="/signin/link">
          <IconButton className="oauth btn-email">
            <Image
              src={'/assets/credentials/email.svg'}
              width={32}
              height={32}
              priority
              alt="image-email"
            />
          </IconButton>
        </Link>
      </Tooltip>
    </>
  );
}
