'use client';

import React, { useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { useRouter } from 'next/navigation';
import { useSession, getSession } from 'next-auth/react';

const AuthRedirect = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies();
  const router = useRouter();
  const { status } = useSession();

  const handleAuthStateChange = useCallback(
    async (itemKey) => {
      if (itemKey === 'signed-in') {
        await getSession();
      } else {
        router.refresh();
      }

      removeCookie(itemKey, { path: '/' });
    },
    [removeCookie, router]
  );

  useEffect(() => {
    if (cookies['signed-in']) {
      handleAuthStateChange('signed-in');
    } else if (cookies['signed-out']) {
      handleAuthStateChange('signed-out');
    }
  }, [cookies, handleAuthStateChange]);

  useEffect(() => {
    if (status === 'authenticated' || status === 'unauthenticated') {
      router.refresh();
    }
  }, [status, router]);

  return <>{children}</>;
};

export default AuthRedirect;
