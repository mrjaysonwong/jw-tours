import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// internal imports
import { API_URLS } from '@/constants/apiRoutes';

async function fetchPaymentStatus(transactionId) {
  try {
    const url = `${API_URLS.BOOKINGS}/status?transactionId=${transactionId}`;

    const { data } = await axios.get(url);

    return data;
  } catch (error) {
    console.error(error);

    throw new Error('Something went wrong');
  }
}

export const usePaymentProcessing = (transactionId, enabled = true) => {
  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['payment-status'],
    queryFn: () => fetchPaymentStatus(transactionId),
    enabled: enabled && !!transactionId,
    refetchInterval: 2000,
  });

  return {
    isLoading,
    data,
    isError,
    error,
  };
};
