import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useSearchParams, usePathname } from 'next/navigation';
import { Paper, Typography, TableContainer, Box } from '@mui/material';

// internal imports
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import CustomError from '@/components/errors/CustomError';
import { useAdminTourReviews } from '@/hooks/useReviews';
import { usePaginationQueryParams } from '@/hooks/usePaginationQueryParams';
import {
  defaultPage,
  defaultLimit,
  allowedLimits,
} from '@/constants/pagination';
import { useSyncSearchQuery } from '@/hooks/useSyncSearchQuery';
import TableContent from './TableContent';
import { ReviewListDataProvider } from '@/contexts/ReviewListProvider';
import CustomSearchBar from '@/components/inputs/CustomSearchBar';
import TableToolbar from './TableToolbar';
import { TableToolbarProvider } from '@/contexts/TableToolbarProvider';
import { useSortHandler } from '@/hooks/useSortHandler';
import CustomTablePagination from '@/components/pagination/CustomTablePagination';
import { getQueryParams } from '@/utils/queryParams';

const ReviewList = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Read query params
  const { pageParam, limitParam, searchQuery, sortParam, tabParam } =
    getQueryParams(searchParams, {
      page: defaultPage,
      limit: defaultLimit,
    });

  const [searchTerm, setSearchTerm] = useState(searchQuery);

  // Search query
  const [debouncedText] = useDebounce(searchTerm, 1500);

  const isEnabled = pathname === '/admin/dashboard/reviews';

  const { orderBy, order, handleRequestSort } = useSortHandler('status', 'asc');

  const {
    isLoading,
    isError,
    error,
    reviews,
    totalCount,
    statusCount,
    refetch,
  } = useAdminTourReviews({
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
  });

  useSyncSearchQuery({
    searchTerm,
    pageParam,
    limitParam,
    sortParam,
    tabParam,
  });

  const tableToolbarCtxValue = {
    totalCount,
    statusCount,
    tabParam,
    debouncedText,
    setSearchTerm,
    reviews,
  };

  const reviewListCtxValue = {
    reviews,
    refetch,
    onRequestSort: handleRequestSort,
    orderBy,
    order,
  };

  return (
    <>
      <Typography variant="h5">List</Typography>

      <Box sx={{ width: { xs: 'auto', md: 300 } }}>
        <CustomSearchBar
          type="review"
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Search by Name, Email, Tour"
        />
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

            <TableContainer sx={{ maxHeight: 540, borderRadius: '5px' }}>
              <ReviewListDataProvider value={reviewListCtxValue}>
                <TableContent />
              </ReviewListDataProvider>
            </TableContainer>

            <CustomTablePagination
              allowedLimits={allowedLimits}
              totalCount={totalCount}
              page={page}
              limit={limit}
              setPage={setPage}
              setLimit={setLimit}
            />
          </>
        )}
      </Paper>
    </>
  );
};

export default ReviewList;
