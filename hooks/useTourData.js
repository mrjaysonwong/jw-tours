import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// internal imports
import { API_URLS } from '@/constants/apiRoutes';

export const useTourListData = () => {
  const fetchTours = async () => {
    try {
      const url = `${API_URLS.TOURS}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data.');
    }
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['tours'],
    queryFn: fetchTours,
  });

  return {
    isLoading,
    ...data,
    isError,
    error,
  };
};

export const useTourData = (tourId) => {
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
        throw new Error('Failed to fetch data.');
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
