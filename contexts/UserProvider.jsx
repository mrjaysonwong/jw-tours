'use client';

import React, { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useUserData } from '@/hooks/useUserData';

export const UserSessionContext = createContext(undefined);
export const UserDataContext = createContext(undefined);

const queryClient = new QueryClient();

export const UserSessionProvider = ({ session, children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionContext.Provider value={session}>
        {children}
      </UserSessionContext.Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};

export const UserDataProvider = ({ children }) => {
  const session = useContext(UserSessionContext);
  const userId = session?.user?.id;
  const email = session?.user?.email;

  const {
    data: user,
    isLoading,
    refetch,
    isError,
    error,
  } = useUserData(userId);

  const userDataContextValues = {
    userId,
    user,
    isLoading,
    email,
    refetch,
    isError,
    error,
  };

  return (
    <UserDataContext.Provider value={userDataContextValues}>
      {children}
    </UserDataContext.Provider>
  );
};
