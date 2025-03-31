import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import axios from 'axios';

// internal imports
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
