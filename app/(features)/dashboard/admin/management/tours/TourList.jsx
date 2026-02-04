import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Typography, Grid, Box, Pagination, Divider } from '@mui/material';

// internal imports
import { useTourList } from '@/hooks/useTours';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import CustomError from '@/components/errors/CustomError';
import TourCard from '@/components/cards/TourCard';
import CustomSearchBar from '@/components/inputs/CustomSearchBar';
import FiltersButton from '@/components/buttons/FiltersButton';
import SortBy from '@/app/(features)/tours/SortBy';
import { tourListParams } from '@/constants/queryParams';
import { sanitizeQueryParams, getQueryParams } from '@/utils/queryParams';
import { useSyncSearchQuery } from '@/hooks/useSyncSearchQuery';

const TourGrid = React.memo(
  ({ tours, currentPage, totalPages, totalTours }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const hasQueryPage = searchParams.has('page');
    const hasSearchQuery = searchParams.has('q');

    useEffect(() => {
      if (currentPage > totalPages) {
        const queryParams = new URLSearchParams(searchParams);
        queryParams.delete('page');
        const url = `${pathname}?${queryParams.toString()}`;
        router.replace(url);
      }
    }, [currentPage, totalPages, pathname, router, searchParams]);

    return (
      <>
        {tours.length === 0 ? (
          <Box
            sx={{
              height: '50vh',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              gap: 1,
              border: '1px solid',
              borderColor: 'divider',
              borderStyle: 'dashed',
              mt: 4,
            }}
          >
            {hasQueryPage && !hasSearchQuery && currentPage > totalPages ? (
              <>
                <Typography variant="h6" color="text.primary">
                  Invalid page
                </Typography>
                <Typography color="secondary">Redirecting...</Typography>
              </>
            ) : (
              <>
                <Typography variant="h6" color="text.primary">
                  No tours found
                </Typography>
                <Typography color="text.secondary">
                  Please update your filters to see more results
                </Typography>
              </>
            )}
          </Box>
        ) : (
          <>
            <Typography color="text.primary" sx={{ my: 1 }}>
              {totalTours} tour{totalTours > 1 ? 's' : ''} found
            </Typography>

            <Divider sx={{ my: 2 }} />

            <Grid container spacing={3}>
              {tours.map((tour, index) => (
                <Grid key={index} item xs={12} sm={6} lg={4}>
                  <TourCard tour={tour} />
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </>
    );
  }
);

const TourList = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Read query params
  const { searchQuery, sortParam, pageParam } = getQueryParams(searchParams);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  const isEnabled = pathname === '/admin/dashboard/tours';

  const { isLoading, isError, error, tours, pagination } = useTourList({
    searchParams,
    enabled: isEnabled,
  });

  const currentPage = pagination?.currentPage;
  const totalPages = pagination?.totalPages;
  const totalTours = pagination?.totalCount;

  const handleChangePage = (event, pageValue) => {
    const queryParams = sanitizeQueryParams(searchParams, tourListParams);

    if (pageValue === 1) {
      queryParams.delete('page');
    } else {
      queryParams.set('page', pageValue);
    }

    router.replace(`${pathname}?${queryParams.toString()}`);
  };

  useSyncSearchQuery({
    searchTerm,
    sortParam,
    pageParam,
    searchParams,
  });

  return (
    <>
      <Typography variant="h5">List</Typography>

      <Box
        sx={{
          display: { xs: 'block', md: 'flex' },
          alignItems: 'start',
        }}
      >
        <Box sx={{ width: { xs: 'auto', md: 420 }, mb: 2 }}>
          <CustomSearchBar
            type="tour"
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={12} textAlign="right">
            <FiltersButton type="tour-listing" />
          </Grid>
          <Grid item xs={12}>
            <SortBy />
          </Grid>
        </Grid>
      </Box>

      {isLoading ? (
        <LoadingSpinner h="70vh" />
      ) : isError ? (
        <CustomError error={error} h="70vh" />
      ) : (
        <>
          <TourGrid
            tours={tours}
            currentPage={currentPage}
            totalPages={totalPages}
            totalTours={totalTours}
          />

          {totalPages > 1 && currentPage >= 1 && currentPage <= totalPages && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 7 }}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handleChangePage}
                color="primary"
              />
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default TourList;
TourGrid.displayName = 'TourGrid';
