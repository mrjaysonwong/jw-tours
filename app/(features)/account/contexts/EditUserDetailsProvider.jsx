import React, { createContext, useContext } from 'react';

const EditUserDetailsContext = createContext(null);

export const EditUserDetailsProvider = ({ value, children }) => {
  return (
    <EditUserDetailsContext.Provider value={value}>
      {children}
    </EditUserDetailsContext.Provider>
  );
};

export const useEditUserDetailsContext = () => {
  return useContext(EditUserDetailsContext);
};
