import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';

import { API_URLS } from '@/config/apiRoutes';

export const useUserData = (userId) => {
  const fetchUser = async () => {
    try {
      const url = `${API_URLS.USERS}/${userId}/self`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data.');
    }
  };

  const { isLoading, data, isError, error, refetch, status } = useQuery({
    queryKey: ['users', userId],
    queryFn: fetchUser,
    enabled: !!userId, // set True only if userId present
  });

  return {
    isLoading,
    ...data,
    isError,
    error,
    refetch,
    status,
  };
};

export const useAdminUserData = (userId) => {
  const fetchUser = async () => {
    try {
      const url = `${API_URLS.USERS}/${userId}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data.');
    }
  };

  const {
    isLoading,
    data,
    isError,
    error,
    refetch,
    status,
  } = useQuery({
    queryKey: ['edit', userId],
    queryFn: fetchUser,
    enabled: !!userId, // set True only if userId present
  });

  if (isError) {
    console.error('useAdminUserData error:', error.message);
  }

  return {
    isLoading,
    ...data,
    isError,
    error,
    refetch,
    status,
  };
};
