import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';

export const useUserData = (userId) => {
  const pathname = usePathname();
  const isMySettings = pathname.startsWith('/mysettings');
  const hasSubpath = pathname.split('/').length > 2;

  const settings = isMySettings && hasSubpath;

  const { isLoading, data, isError, error, refetch, status } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // set True only if userId present
  });

  const fetchUser = async (userId) => {
    let url;

    try {
      if (settings) {
        url = `/api/users?userId=${userId}&settings=${settings}`;
      } else {
        url = `/api/users?userId=${userId}`;
      }

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      // console.error(error.message);
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
