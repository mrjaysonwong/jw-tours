import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';

// internal imports
import { API_URLS } from '@/constants/apiRoutes';

export const useTourReviews = (tourId, value) => {
  const fetchReviews = async ({ pageParam = 0 }) => {
    try {
      const limit = 1; // page size

      const url = `${API_URLS.TOURS}/${tourId}/reviews?limit=${limit}&offset=${pageParam}&rating=${value}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);

      throw new Error('Failed to fetch data.');
    }
  };

  const {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['reviews', tourId, value],
    queryFn: fetchReviews,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      const totalReviews = lastPage.totalReviews;
      const totalSoFar = allPages.flatMap((p) => p.data).length;

      if (totalSoFar >= totalReviews) return undefined;

      return totalSoFar; // next offset
    },
  });

  return {
    data,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};
