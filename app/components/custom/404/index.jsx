'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MainContainer } from '../styles/globals';
import { Typography, Button } from '@mui/material';

export default function Custom404() {
  return (
    <MainContainer sx={{ m: 2, textAlign: 'center' }}>
      <Image
        src={'/assets/404-error.png'}
        width={128}
        height={128}
        priority
        alt="404-errorr"
      />
      <Typography variant="h4" sx={{ color: 'var(--palette-purple)' }}>
        There was a problem.
      </Typography>
      <Typography>We could not find the page you were looking for.</Typography>
      <br />
      <Typography>
        Go back to
        <Link href="/" replace>
          <Button variant="text" sx={{ my: 2, ml: 1 }}>
            Home page
          </Button>
        </Link>
      </Typography>
    </MainContainer>
  );
}
