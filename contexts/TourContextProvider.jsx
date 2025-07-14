'use client';

import { createContext, useContext } from 'react';

export const CreateNewTourContext = createContext(undefined);
export const TourDetailsContext = createContext(undefined);

export const CreateNewTourProvider = ({ value, children }) => {
  return (
    <CreateNewTourContext.Provider value={value}>
      {children}
    </CreateNewTourContext.Provider>
  );
};

export const TourDetailsProvider = ({ value, children }) => {
  return (
    <TourDetailsContext.Provider value={value}>
      {children}
    </TourDetailsContext.Provider>
  );
};

export const useCreateTourContext = () => {
  return useContext(CreateNewTourContext);
};

export const useTourDetails = () => {
  return useContext(TourDetailsContext);
};


