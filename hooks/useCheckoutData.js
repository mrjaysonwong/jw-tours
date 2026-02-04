import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// internal imports
import { API_URLS } from '@/constants/apiRoutes';

export const useCheckoutData = (token) => {
  const fetchCheckoutTour = async () => {
    try {
      const url = `${API_URLS.CHECKOUTS}/${token}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);

      throw new Error('Something went wrong');
    }
  };

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['checkout', token],
    queryFn: fetchCheckoutTour,
    enabled: !!token,
  });

  return {
    isLoading,
    data,
    isError,
    error,
    refetch,
  };
};
