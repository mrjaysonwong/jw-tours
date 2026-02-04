import { useState, useCallback } from 'react';
import Link from 'next/link';
import { useDebounce } from 'use-debounce';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { TableContainer, Typography, Paper, Box, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// internal imports
import { useUserList } from '@/hooks/useUser';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import CustomError from '@/components/errors/CustomError';
import { EnhancedTableToolbar, TableContent, TableToolbar } from '.';
import { usePaginationQueryParams } from '@/hooks/usePaginationQueryParams';
import { allowedLimits } from '@/constants/pagination';
import { UserListDataProvider } from '@/contexts/UserProvider';
import { TableToolbarProvider } from '@/contexts/TableToolbarProvider';
import CustomSearchBar from '@/components/inputs/CustomSearchBar';
import { useSyncSearchQuery } from '@/hooks/useSyncSearchQuery';
import { useSortHandler } from '@/hooks/useSortHandler';
import CustomTablePagination from '@/components/pagination/CustomTablePagination';
import { filterParams, getQueryParams } from '@/utils/queryParams';

const UserList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  // Read query params
  const { pageParam, limitParam, searchQuery, sortParam, tabParam, roleParam } =
    getQueryParams(searchParams);

  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [selected, setSelected] = useState(new Set());

  // Search query
  const [debouncedText] = useDebounce(searchTerm, 1500);

  const isEnabled = pathname === '/admin/dashboard/users';

  const { orderBy, order, handleRequestSort } = useSortHandler(
    'createdAt',
    'asc'
  );

  const { isLoading, isError, error, users, totalCount, statusCount, refetch } =
    useUserList({
      searchParams,
      enabled: isEnabled,
    });

  const { page, limit, setPage, setLimit } = usePaginationQueryParams({
    totalCount,
    pageParam,
    limitParam,
    searchQuery,
    sortParam,
    tabParam,
    roleParam,
  });

  useSyncSearchQuery({
    searchTerm,
    sortParam,
    searchParams,
  });

  const handleRowSelect = useCallback((event, id) => {
    setSelected((prevSelected) => {
      const newSelected = new Set(prevSelected);

      if (newSelected.has(id)) {
        newSelected.delete(id); // Deselect
      } else {
        newSelected.add(id); // Select
      }

      return newSelected;
    });
  }, []);

  const handleSelectAll = useCallback((event, allIds) => {
    const isChecked = event.target.checked;
    setSelected(isChecked ? new Set(allIds) : new Set());
  }, []);

  const handleChangeRole = useCallback(
    (event) => {
      const newRole = event.target.value;

      const queryParams = new URLSearchParams(searchParams);
      queryParams.set('role', newRole ?? '');
      queryParams.delete('page');
      queryParams.delete('limit');
      router.replace(`${pathname}?${queryParams.toString()}`);
    },
    [searchParams, pathname, router]
  );

  const handleClearFilters = useCallback(() => {
    const queryParams = filterParams({ q: searchQuery, sort: sortParam });

    router.replace(`${pathname}?${queryParams.toString()}`);
  }, [pathname, router, searchQuery, sortParam]);

  const tableToolbarCtxValue = {
    totalCount,
    statusCount,
    tabParam,
    debouncedText,
    setSearchTerm,
    role: roleParam,
    onChangeRole: handleChangeRole,
    users,
    onClearFilters: handleClearFilters,
  };

  const userListCtxValue = {
    users,
    refetch,
    onRequestSort: handleRequestSort,
    orderBy,
    order,
    selected,
    onRowSelect: handleRowSelect,
    onSelectAll: handleSelectAll,
  };

  return (
    <>
      <Typography variant="h5">List</Typography>

      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'center',
        }}
      >
        <Box sx={{ width: { xs: 'auto', md: 300 } }}>
          <CustomSearchBar
            type="user"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            placeholder="Search by Name, Email"
          />
        </Box>

        <Box sx={{ ml: 'auto', textAlign: 'right', my: { xs: 2, md: 'auto' } }}>
          <Link href="/admin/dashboard/users/new">
            <Button startIcon={<AddIcon />} variant="contained">
              Add New User
            </Button>
          </Link>
        </Box>
      </Box>

      <Paper sx={{ my: 2 }}>
        {isLoading ? (
          <LoadingSpinner h="100vh" />
        ) : isError ? (
          <CustomError error={error} h="100vh" />
        ) : (
          <>
            <TableToolbarProvider value={tableToolbarCtxValue}>
              <TableToolbar />
            </TableToolbarProvider>

            {selected.size > 0 && (
              <EnhancedTableToolbar
                numSelected={selected.size}
                selected={selected}
                setSelected={setSelected}
              />
            )}

            <TableContainer sx={{ maxHeight: 540, borderRadius: '5px' }}>
              <UserListDataProvider value={userListCtxValue}>
                <TableContent />
              </UserListDataProvider>
            </TableContainer>

            <CustomTablePagination
              allowedLimits={allowedLimits}
              totalCount={totalCount}
              limit={limit}
              page={page}
              setPage={setPage}
              setLimit={setLimit}
            />
          </>
        )}
      </Paper>
    </>
  );
};

export default UserList;
