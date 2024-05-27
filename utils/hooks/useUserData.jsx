import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const useUserData = (userId) => {
  const { isLoading, data, isError, error, refetch, status } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // set True only if userId present
  });

  const fetchUser = async (userId) => {
    try {
      const url = `/api/users?userId=${userId}`;
      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('An error occured. Try again.');
    }
  };

  return {
    isLoading,
    ...data,
    isError,
    error,
    refetch,
    status,
  };
};
