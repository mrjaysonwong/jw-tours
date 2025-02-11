import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { stripLocale } from '@/helpers/pageHelpers';

export const useUserData = (userId) => {
  const pathname = usePathname();
  const strippedPathname = stripLocale(pathname);
  const isNestedRoute = strippedPathname.split('/').length > 2;
  const isAccountSettings = pathname.includes('mysettings') && isNestedRoute;

  const fetchUser = async () => {
    try {
      const url = `/api/v1/users/self${
        isAccountSettings ? '' : `?projection=basic`
      }`;

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
      const url = `/api/v1/users/${userId}`;

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
    refetch: adminRefetch,
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
    adminRefetch,
    status,
  };
};
