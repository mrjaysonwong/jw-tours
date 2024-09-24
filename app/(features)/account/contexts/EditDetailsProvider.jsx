import React, { createContext } from 'react';

export const EditDetailsContext = createContext(null);

export const EditDetailsProvider = ({ value, children }) => {
  return (
    <EditDetailsContext.Provider value={value}>
      {children}
    </EditDetailsContext.Provider>
  );
};
