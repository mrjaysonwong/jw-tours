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

    const handleRefresh = (itemKey) => {
      router.refresh();
      localStorage.removeItem(itemKey);
    };

    if (status === 'unauthenticated' && signedOut) {
      handleRefresh('signed-out');
    } else if (signedIn) {
      handleRefresh('signed-in');
    } else {
      router.refresh();
    }
  }, [router, status]);

  return <>{children}</>;
}
