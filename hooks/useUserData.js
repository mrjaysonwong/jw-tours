import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import axios from 'axios';

// internal inports
import { API_URLS } from '@/constants/apiRoutes';
import { fetchRandomUsers } from '@/data/randomUsers';

export const useUserListData = (debouncedText, page, rowsPerPage) => {
  const pathname = usePathname();
  const isEnabled = pathname.includes('/dashboard/users');

  const fetchUsers = async () => {
    try {
      const url = debouncedText
        ? `/api/v1/users?q=${debouncedText}&page=${
            page + 1
          }&limit=${rowsPerPage}`
        : `/api/v1/users?page=${page + 1}&limit=${rowsPerPage}`;

      const { data } = await axios.get(url);

      return data;

      /* Test large data set */
      // const { users } = await fetchRandomUsers();

      // const filteredUsers = debouncedText
      //   ? users.filter((user) =>
      //       `${user.firstName} ${user.lastName}`
      //         .toLowerCase()
      //         .includes(debouncedText.toLowerCase())
      //     )
      //   : users;

      // const start = page * rowsPerPage;
      // const paginatedUsers = filteredUsers.slice(start, start + rowsPerPage);

      // return {
      //   data: paginatedUsers,
      //   total: users.length, // Simulated total users count
      // };
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch data.');
    }
  };

  const { isLoading, data, isError, error, refetch, status } = useQuery({
    queryKey: ['users', debouncedText, page, rowsPerPage],
    queryFn: fetchUsers,
    enabled: !!isEnabled,
  });

  return {
    isLoading,
    users: data?.data,
    total: data?.total,
    // users: data?.data || [],
    // total: data?.total || 0,
    isError,
    error,
    refetch,
    status,
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

      if (error.response.status >= 400 && error.response.status < 500) {
        return { statusCode: error.response?.status };
      } else {
        throw new Error('Failed to fetch data.');
      }
    }
  };

  const { isLoading, data, isError, error, refetch, status } = useQuery({
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
