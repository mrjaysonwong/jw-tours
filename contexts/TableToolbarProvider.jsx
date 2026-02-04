import { createContext, useContext, useMemo } from 'react';

export const TableToolbarContext = createContext(undefined);

export const TableToolbarProvider = ({ value, children }) => {
  const {
    totalCount,
    statusCount,
    tabParam,
    debouncedText,
    setSearchTerm,
    role,
    onChangeRole,
    users,
    onClearFilters,
    reviews,
  } = value;

  const memoizedValue = useMemo(
    () => ({
      totalCount,
      statusCount,
      tabParam,
      debouncedText,
      setSearchTerm,
      role,
      onChangeRole,
      users,
      onClearFilters,
      reviews,
    }),
    [
      totalCount,
      statusCount,
      tabParam,
      debouncedText,
      setSearchTerm,
      role,
      onChangeRole,
      users,
      onClearFilters,
      reviews,
    ]
  );

  return (
    <TableToolbarContext.Provider value={memoizedValue}>
      {children}
    </TableToolbarContext.Provider>
  );
};

export const useTableToolbarContext = () => {
  return useContext(TableToolbarContext);
};
