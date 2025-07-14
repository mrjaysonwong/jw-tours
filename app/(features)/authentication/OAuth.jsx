'use client';

// third-party imports
import Link from 'next/link';
import { useCookies } from 'react-cookie';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import { IconButton, Tooltip } from '@mui/material';

// internal imports
import { BASE_URL } from '@/constants/env';

const OAuth = () => {
  const [cookies, setCookie] = useCookies();

  const pathname = usePathname();

  const callbackUrl = `${BASE_URL}${pathname}`;
  const encodedCallbackUrl = encodeURIComponent(callbackUrl);

  return (
    <>
      <Tooltip title="Sign in with Google" placement="bottom-start">
        <IconButton
          className="oauth btn-google"
          onClick={() => {
            setCookie('signed-in', 'true', { path: '/' });
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
            setCookie('signed-in', 'true', { path: '/' });
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
            setCookie('signed-in', 'true', { path: '/' });
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
        <Link
          href={`/signin/email-link?callbackUrl=${encodedCallbackUrl}`}
          scroll={false}
        >
          <IconButton className="oauth btn-email">
            <Image
              src={'/assets/credentials/email.svg'}
              width={32}
              height={32}
              priority
              alt="email vector"
            />
          </IconButton>
        </Link>
      </Tooltip>
    </>
  );
};

export default OAuth;
