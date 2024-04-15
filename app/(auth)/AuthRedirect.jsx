'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

export default function AuthRedirect({ children }) {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    const signedOut = localStorage.getItem('signed-out');
    const signedIn = localStorage.getItem('signed-in');

    const unAuthenticated = status === 'unauthenticated';
    const authenticated = status === 'authenticated';

    if (unAuthenticated && signedOut) {
      console.log('signed out...');
      const timeoutId = setTimeout(() => {
        router.refresh();
        localStorage.removeItem('signed-out');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }

    if (authenticated && signedIn) {
      console.log('signed in...');
      const timeoutId = setTimeout(() => {
        router.refresh();
        localStorage.removeItem('signed-in');
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [router, status]);

  return <>{children}</>;
}
