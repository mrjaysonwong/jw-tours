'use client';

import { useSearchParams } from 'next/navigation';
import { Typography, Box } from '@mui/material';
import Image from 'next/image';
import { unstable_noStore as noStore } from 'next/cache';

export default function ConfirmSigninLink() {
  noStore();
  const searchParams = useSearchParams();

  const email = searchParams.get('email');

  return (
    <>
      <Typography variant="h4">Verify Your Email Address</Typography>
      <Box sx={{ my: 1 }}>
        <Image
          src={'/assets/email_sent.png'}
          width={64}
          height={64}
          priority
          alt="email_sent"
        />
      </Box>

      <Typography>
        We have sent a verification link to{' '}
        <span style={{ color: '#0288d1' }}>{email}</span>
      </Typography>
      <Typography sx={{ my: 1 }}>
        Please check your email and click the sign-in link to complete the
        verification process.
      </Typography>
    </>
  );
}
