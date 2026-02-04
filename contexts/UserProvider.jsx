'use client';

// third party imports
import React, { createContext, useContext, useMemo } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

// internal imports
import { useUserData } from '@/hooks/useUser';

export const UserSessionContext = createContext(undefined);

export const UserDataContext = createContext({
  refetch: () => console.warn('Refetch called without a provider'),
});

export const UserDetailsContext = createContext({
  userId: null,
  user: null,
  email: null,
});
export const UserNotificationsContext = createContext(undefined);
export const UserListDataContext = createContext(undefined);

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

export const UserDetailsProvider = ({ value, children }) => {
  return (
    <UserDetailsContext.Provider value={value}>
      {children}
    </UserDetailsContext.Provider>
  );
};

export const UserNotificationsProvider = ({ value, children }) => {
  return (
    <UserNotificationsContext.Provider value={value}>
      {children}
    </UserNotificationsContext.Provider>
  );
};

export const UserListDataProvider = ({ value, children }) => {
  const {
    users,
    refetch,
    onRequestSort,
    orderBy,
    order,
    selected,
    onRowSelect,
    onSelectAll,
  } = value;

  const memoizedValue = useMemo(
    () => ({
      users,
      refetch,
      onRequestSort,
      orderBy,
      order,
      selected,
      onRowSelect,
      onSelectAll,
    }),
    [
      users,
      refetch,
      onRequestSort,
      orderBy,
      order,
      selected,
      onRowSelect,
      onSelectAll,
    ]
  );

  return (
    <UserListDataContext.Provider value={memoizedValue}>
      {children}
    </UserListDataContext.Provider>
  );
};

export const useUserSessionContext = () => {
  return useContext(UserSessionContext);
};

export const useUserDataContext = () => {
  return useContext(UserDataContext);
};

export const useUserDetailsContext = () => {
  return useContext(UserDetailsContext);
};

export const useUserNotificationsContext = () => {
  return useContext(UserNotificationsContext);
};

export const useUserListContext = () => {
  return useContext(UserListDataContext);
};
