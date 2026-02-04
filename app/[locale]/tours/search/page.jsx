import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// internal imports
import { StyledContainer } from '@/components/styled/StyledContainers';
import { fetchSearchTours } from '@/services/tours/fetchTours';
import SearchTours from '@/app/(features)/tours/SearchTours';
import LoadingSpinner from '@/components/loaders/LoadingSpinner';
import { getCurrencyFromCookies } from '@/helpers/pageHelpers';
import { fetchWishlist } from '@/services/wishlists/fetchWishlist';
import { sanitizeQueryParams } from '@/utils/queryParams';
import { tourListParams } from '@/constants/queryParams';

async function SearchToursSection({ queryString, currency, searchParams }) {
  const queryParams = sanitizeQueryParams(searchParams, tourListParams, {
    isServerComponent: true,
  });

  const options = {
    headers: {
      'x-currency': encodeURIComponent(JSON.stringify(currency)),
    },
  };

  const { tours, pagination } = await fetchSearchTours({
    queryString,
    options,
  });

  const { guest, user } = await fetchWishlist();

  const updatedTours = tours.map((tour) => ({
    ...tour,
    wishlist: {
      guest,
      user,
    },
  }));

  if (
    queryParams.has('page') &&
    (pagination.totalPages === 0 ||
      pagination.currentPage > pagination.totalPages)
  ) {
    queryParams.delete('page');
    redirect(`?${queryParams.toString()}`);
  }

  return (
    <SearchTours
      tours={updatedTours}
      page={pagination.currentPage}
      totalPages={pagination.totalPages}
      totalTours={pagination.totalCount}
      q={searchParams?.q}
    />
  );
}

export default async function SearchToursPage({ searchParams }) {
  const queryParams = new URLSearchParams(searchParams);
  const currency = getCurrencyFromCookies(cookies);

  return (
    <StyledContainer sx={{ minHeight: '0vh' }}>
      <Suspense fallback={<LoadingSpinner h="80vh" />}>
        <SearchToursSection
          queryString={queryParams.toString()}
          currency={currency}
          searchParams={searchParams}
        />
      </Suspense>
    </StyledContainer>
  );
}
