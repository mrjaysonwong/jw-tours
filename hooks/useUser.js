import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// internal inports
import { API_URLS } from '@/constants/apiRoutes';

export const useUserList = ({ searchParams, enabled = false }) => {
  const queryString = new URLSearchParams(searchParams).toString();

  const fetchUserList = async () => {
    try {
      const url = `${API_URLS.USERS}?${queryString}`;
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
    }
  };

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['users', queryString],
    queryFn: fetchUserList,
    enabled,
  });

  return {
    isLoading,
    isError,
    error,
    users: data?.data ?? [],
    totalCount: data?.totalCount,
    statusCount: data?.statusCount,
    refetch,
  };
};

export const useUserData = (userId) => {
  const fetchUser = async () => {
    try {
      const url = `${API_URLS.USERS}/${userId}/self`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Something went wrong');
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

      if (error.response.status >= 400 && error.response.status < 500) {
        return { statusCode: error.response?.status };
      } else {
        throw new Error('Something went wrong');
      }
    }
  };

  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['edit', userId],
    queryFn: fetchUser,
    enabled: !!userId, // set True only if userId present
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
