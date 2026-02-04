import { createContext, useContext } from 'react';

export const WishlistDataContext = createContext(undefined);

export const WishlistDataProvider = ({ value, children }) => {
  return (
    <WishlistDataContext.Provider value={value}>
      {children}
    </WishlistDataContext.Provider>
  );
};

export const useWishlistDataContext = () => {
  return useContext(WishlistDataContext);
};
