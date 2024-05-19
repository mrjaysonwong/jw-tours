'use client';

import React, { createContext } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const UserSessionContext = createContext(null);

const queryClient = new QueryClient();

export function UserSessionWrapper({ session, children }) {

  return (
    <QueryClientProvider client={queryClient}>
      <UserSessionContext.Provider value={session}>
        {children}
      </UserSessionContext.Provider>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}
