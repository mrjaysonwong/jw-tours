'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import PageSpinner from '@/app/components/custom/loaders/PageSpinner';
import { authenticate } from '../actions';

export default function Verify(props) {
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
    <MainContainer sx={{ alignItems: 'center' }}>
      <PageSpinner />
    </MainContainer>
  );
}
