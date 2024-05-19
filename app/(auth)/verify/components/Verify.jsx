'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { StyledContainer as MainContainer } from '@/app/components/global-styles/globals';
import PageSpinner from '@/app/components/custom/loaders/PageSpinner';

export default function Verify(props) {
  const { token, email, mode, callbackUrl } = props;
  const router = useRouter();

  const handleSignIn = async () => {
    const res = await signIn('email', {
      redirect: false,
      token: token,
      email: email,
      mode: mode,
    });

    if (res.error) {
      router.replace('/notifications/authentication-failed');
    } else {
      localStorage.setItem('signed-in', 'true');
      router.replace(callbackUrl ?? '/');
    }
  };

  useEffect(() => {
    if (email && token) {
      handleSignIn();
    }
  }, [email, token]);

  return (
    <MainContainer
      sx={{
        mt: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PageSpinner />
    </MainContainer>
  );
}
