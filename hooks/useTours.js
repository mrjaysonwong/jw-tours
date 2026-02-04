import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// internal imports
import { API_URLS } from '@/constants/apiRoutes';
import { filterParams } from '@/utils/queryParams';

export const useSearchTours = ({ debouncedText }) => {
  const queryParams = filterParams({
    q: debouncedText,
  });

  const fetchTours = async () => {
    try {
      const url = `${API_URLS.SEARCH_TOURS}?${queryParams.toString()}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['search-tours', debouncedText],
    queryFn: fetchTours,
    enabled: !!debouncedText,
  });

  return {
    isLoading,
    isError,
    error,
    tours: data?.data ?? [],
    pagination: data?.pagination,
  };
};

export const useTourList = ({ searchParams, enabled = false }) => {
  const queryString = new URLSearchParams(searchParams).toString();

  const fetchTours = async () => {
    try {
      const url = `${API_URLS.TOURS}?${queryString}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['tours', queryString],
    queryFn: fetchTours,
    enabled,
  });

  return {
    isLoading,
    isError,
    error,
    tours: data?.data ?? [],
    pagination: data?.pagination,
  };
};

export const useTour = (tourId) => {
  const fetchTour = async () => {
    try {
      const url = `${API_URLS.TOURS}/${tourId}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);

      if (error.response.status >= 400 && error.response.status < 500) {
        return { statusCode: error.response?.status };
      } else {
        throw new Error('Something went wrong');
      }
    }
  };

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['tour', tourId],
    queryFn: fetchTour,
    enabled: !!tourId, // set True only if tourId present
  });

  return {
    isLoading,
    ...data,
    isError,
    error,
    refetch,
    isClientError: data?.statusCode >= 400 && data?.statusCode < 500,
  };
};
