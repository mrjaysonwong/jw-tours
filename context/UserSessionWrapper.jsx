
'use client';

import React, { createContext } from 'react';

export const UserSessionContext = createContext(null);

export function UserSessionWrapper({ session, children }) {
  return (
    <UserSessionContext.Provider value={session}>
      {children}
    </UserSessionContext.Provider>
  );
}
