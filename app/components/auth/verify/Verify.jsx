'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { MainContainer } from '@/app/components/custom/styles/globals';
import PageSpinner from '@/app/components/custom/loaders/PageSpinner';

export default function Verify() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');
  const mode = searchParams.get('mode');

  const handleSignIn = async () => {
    const res = await signIn('email', {
      redirect: false,
      token: token,
      email: email,
    });

    if (res.error) {
      router.replace('/notifications/authentication-failed');
    } else {
      router.push('/');
    }
  };

  useEffect(() => {
    if (email && token) {
      handleSignIn();
    }
  }, [email, token]);

  return (
    <MainContainer>
      <PageSpinner />
    </MainContainer>
  );
}
