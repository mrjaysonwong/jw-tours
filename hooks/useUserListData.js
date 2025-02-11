import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import axios from 'axios';

// internal imports
import { getLastSegment } from '@/helpers/pageHelpers';

export const useUserListData = (debouncedText, page, rowsPerPage) => {
  const pathname = usePathname();
  const lastSegment = getLastSegment(pathname);
  const isUserList = lastSegment === 'users';

  const fetchUsers = async () => {
    try {
      const url = debouncedText
        ? `/api/v1/users?q=${debouncedText}&page=${
            page + 1
          }&limit=${rowsPerPage}`
        : `/api/v1/users?page=${page + 1}&limit=${rowsPerPage}`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data.');
    }
  };

  const { isLoading, data, isError, error, refetch, status } = useQuery({
    queryKey: ['users', debouncedText, page, rowsPerPage],
    queryFn: fetchUsers,
    enabled: !!isUserList,
  });

  return {
    isLoading,
    users: data?.data,
    total: data?.total,
    isError,
    error,
    refetch,
    status,
  };
};
