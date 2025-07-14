import { useQuery } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import axios from 'axios';

export const useTourGuideListData = (id) => {
  const pathname = usePathname();
  const isEnabled =
    pathname.includes('/tours/new') || pathname.includes(`/${id}/edit`);

  const fetchGuides = async () => {
    try {
      const url = `/api/v1/guides`;

      const { data } = await axios.get(url);

      return data;
    } catch (error) {
      throw new Error('Failed to fetch data.');
    }
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['guides'],
    queryFn: fetchGuides,
    enabled: !!isEnabled,
  });

  return {
    isLoading,
    ...data,
    isError,
    error,
  };
};
