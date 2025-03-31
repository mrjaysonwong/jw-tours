'use client';

import { createContext, useContext } from 'react';

export const GuideProfileContext = createContext(undefined);

export const GuideProfileProvider = ({ value, children }) => {
  return (
    <GuideProfileContext.Provider value={value}>
      {children}
    </GuideProfileContext.Provider>
  );
};

export const useGuideData = () => {
  return useContext(GuideProfileContext);
};
