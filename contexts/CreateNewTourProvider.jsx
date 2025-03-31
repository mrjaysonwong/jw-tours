'use client';

import { createContext, useContext } from 'react';

export const CreateNewTourContext = createContext(undefined);

export const CreateNewTourProvider = ({ value, children }) => {
  return (
    <CreateNewTourContext.Provider value={value}>
      {children}
    </CreateNewTourContext.Provider>
  );
};

export const useCreateTourContext = () => {
  return useContext(CreateNewTourContext);
};
