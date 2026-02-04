import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

// internal imports
import { API_URLS } from '@/constants/apiRoutes';
import { filterParams } from '@/utils/queryParams';

export const useTourReviews = (tourId, rating) => {
  const fetchTourReviews = async ({ pageParam }) => {
    try {
      const queryParams = filterParams({
        limit: 1, // adjust page size
        skip: pageParam,
        rating,
      });

      const url = `${
        API_URLS.TOURS
      }/${tourId}/reviews?${queryParams.toString()}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong.');
    }
  };

  const {
    data,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    isError,
    error,
  } = useInfiniteQuery({
    queryKey: ['reviews', tourId, rating],
    queryFn: fetchTourReviews,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalReviews = lastPage.totalReviews;
      const totalSoFar = allPages.flatMap((p) => p.reviews).length;

      if (totalSoFar >= totalReviews) return undefined;

      return totalSoFar; // next offset
    },
  });

  // flatten the reviews
  const allReviews = data?.pages.flatMap((page) => page.reviews) ?? [];

  return {
    isLoading,
    isError,
    error,
    reviews: allReviews,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  };
};

export const useAdminTourReviews = ({ searchParams, enabled = false }) => {
  const queryString = new URLSearchParams(searchParams).toString();

  const fetchTourReviews = async () => {
    try {
      const url = `${API_URLS.REVIEWS}?${queryString}`;
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  };

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['dashboard-reviews', queryString],
    queryFn: fetchTourReviews,
    enabled,
  });

  return {
    isLoading,
    isError,
    error,
    reviews: data?.reviews ?? [],
    totalCount: data?.totalCount,
    statusCount: data?.statusCount,
    refetch,
  };
};
