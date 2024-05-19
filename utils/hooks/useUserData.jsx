import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { sleep } from '../helper/common';

export const useUserData = (userId) => {
  const { isLoading, data, isError, error, refetch } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
  });

  const fetchUser = async (userId) => {
    try {
      await sleep(1000);

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
  };
};
