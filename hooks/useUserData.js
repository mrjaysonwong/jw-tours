import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import axios from 'axios';
import { usePathname } from 'next/navigation';

// local imports
import { locales } from '@/navigation';

export const useUserData = (userId) => {
  const pathname = usePathname();

  const isMySettings =
    locales.some((locale) => pathname.startsWith(`/${locale}/`)) ||
    pathname.startsWith('/mysettings');

  const isSettings = isMySettings && pathname.split('/').length > 2;

  const fetchUser = async () => {
    const url = `/api/account/details?userId=${userId}${
      isSettings ? `&settings=${isSettings}` : ''
    }`;

    const { data } = await axios.get(url);

    return data;
  };

  const { isLoading, data, isError, error, refetch, status } = useQuery({
    queryKey: ['user', userId],
    queryFn: fetchUser,
    enabled: !!userId, // set True only if userId present
  });

  if (isError) {
    console.error('useUserData error:', error.message);
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
