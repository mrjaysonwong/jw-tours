import { createContext, useContext, useMemo } from 'react';

export const ReviewListDataContext = createContext(undefined);

export const ReviewListDataProvider = ({ value, children }) => {
  const { reviews, refetch, onRequestSort, orderBy, order } = value;

  const memoizedValue = useMemo(
    () => ({
      reviews,
      refetch,
      onRequestSort,
      orderBy,
      order,
    }),
    [reviews, refetch, onRequestSort, orderBy, order]
  );

  return (
    <ReviewListDataContext.Provider value={memoizedValue}>
      {children}
    </ReviewListDataContext.Provider>
  );
};

export const useReviewListDataContext = () => {
  return useContext(ReviewListDataContext);
};
