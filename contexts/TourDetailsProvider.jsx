'use client';

import { createContext, useContext } from 'react';

export const TourDetailsContext = createContext(undefined);

export const TourDetailsProvider = ({ value, children }) => {
  return (
    <TourDetailsContext.Provider value={value}>
      {children}
    </TourDetailsContext.Provider>
  );
};

export const useTourDetails = () => {
  return useContext(TourDetailsContext);
};
