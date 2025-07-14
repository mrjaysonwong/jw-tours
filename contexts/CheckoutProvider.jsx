'use client';

import { createContext, useContext } from 'react';

export const CheckoutContext = createContext(undefined);

export const CheckoutProvider = ({ value, children }) => {
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

export const useCheckoutContext = () => {
  return useContext(CheckoutContext);
};
