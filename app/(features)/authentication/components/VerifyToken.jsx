'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';

// local imports
import { StyledAuthContainer } from '@/components/styled/StyledContainers';
import { LoadingSpinner } from '@/components/loaders/PageSpinners';
import { authenticate } from '@/app/[locale]/(auth)/verify/actions';

export default function VerifyToken(props) {
  const { token, email, action, callbackUrl } = props;

  const router = useRouter();

  const handleSignIn = async () => {
    try {
      const res = await authenticate(token, email, action, callbackUrl);

      if (res?.error) {
        if (res.error.message === 'Internal Server Error') {
          router.replace(
            `/error?token=${token}&email=${email}&action=${action}`
          );
        } else {
          router.push('/notifications/authentication-failed');
        }
      } else {
        localStorage.setItem('signed-in', 'true');
      }
    } catch (error) {
      router.replace(`/error?token=${token}&email=${email}&action=${action}`);
    }
  };

  useEffect(() => {
    if (email && token) {
      handleSignIn();
    }
  }, [email, token, router]);

  return (
    <StyledAuthContainer>
      <LoadingSpinner />
      <Typography sx={{ my: 2 }}>Please wait a moment.</Typography>
    </StyledAuthContainer>
  );
}
