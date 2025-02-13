'use client';

import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { Typography } from '@mui/material';

// internal imports
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import { authenticate } from '@/app/[locale]/(auth)/verify/actions';
import Error from '@/app/[locale]/error';

const VerifyToken = ({ token, email, action, callbackUrl }) => {
  const [hasError, setHasError] = useState(false);
  const [cookies, setCookie] = useCookies();
  const router = useRouter();
  const decodedCallbackUrl = decodeURIComponent(callbackUrl);

  useEffect(() => {
    const handleSignIn = async () => {
      try {
        const res = await authenticate(token, email, action);

        if (res?.error) {
          if (res.error.status === 500) {
            setHasError(true);
          } else {
            router.replace('/notifications/authentication-failed');
          }
          return;
        }

        setHasError(false);
        setCookie('signed-in', 'true', { path: '/' });
        router.replace(
          decodedCallbackUrl === 'undefined' ? '/' : decodedCallbackUrl
        );
      } catch (error) {
        setHasError(true);

        throw error;
      }
    };

    if (email && token) {
      handleSignIn();
    }
  }, [email, token, action, decodedCallbackUrl, router, setCookie]);

  if (hasError) {
    return <Error />;
  }

  return (
    <LoadingSpinner>
      <Typography sx={{ my: 2 }}>Verifying...</Typography>
    </LoadingSpinner>
  );
};

export default VerifyToken;
