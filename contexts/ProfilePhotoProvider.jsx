'use client';

import { createContext, useContext } from 'react';

export const ProfilePhotoContext = createContext(undefined);

export const ProfilePhotoProvider = ({ value, children }) => {
  return (
    <ProfilePhotoContext.Provider value={value}>
      {children}
    </ProfilePhotoContext.Provider>
  );
};

export const useProfilePhotoContext = () => {
  return useContext(ProfilePhotoContext);
};
