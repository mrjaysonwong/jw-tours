'use client';

// third party imports
import React, { createContext, useContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { usePathname } from 'next/navigation';

// internal imports
import { useUserData } from '@/hooks/useUserData';
import { useUserListData } from '@/hooks/useUserListData';
import { getLastSegment } from '@/helpers/pageHelpers';

export const UserSessionContext = createContext(undefined);

export const UserDataContext = createContext({
  refetch: () => console.warn('Refetch called without a provider'),
});

export const UserListDataContext = createContext(undefined);
export const UserDetailsContext = createContext({
  userId: null,
  user: null,
  email: null,
});

const queryClient = new QueryClient();

export const UserSessionProvider = ({ session, children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionContext.Provider value={session}>
        {children}
      </UserSessionContext.Provider>
      {/* <ReactQueryDevtools initialIsOpen={true} /> */}
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

  const contextValues = {
    userId,
    user,
    isLoading,
    email,
    refetch,
    isError,
    error,
  };

  return (
    <UserDataContext.Provider value={contextValues}>
      {children}
    </UserDataContext.Provider>
  );
};

export const UserListDataProvider = ({ children }) => {
  const pathname = usePathname();
  const lastSegment = getLastSegment(pathname);
  const isUserList = lastSegment === 'users';
  // const isUserList = lastSegment === 'user-list';

  const {
    data: users,
    isLoading,
    refetch,
    isError,
    error,
  } = useUserListData(isUserList);

  const contextValues = {
    users,
    isLoading,
    refetch,
    isError,
    error,
  };

  return (
    <UserListDataContext.Provider value={contextValues}>
      {children}
    </UserListDataContext.Provider>
  );
};

export const UserDetailsProvider = ({ value, children }) => {
  return (
    <UserDetailsContext.Provider value={value}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const useUserSessionContext = () => {
  return useContext(UserSessionContext);
};

export const useUserDataContext = () => {
  return useContext(UserDataContext);
};

export const useUserListDataContext = () => {
  return useContext(UserListDataContext);
};

export const useUserDetailsContext = () => {
  return useContext(UserDetailsContext);
};
