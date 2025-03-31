import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const usePlacesData = (debouncedText) => {
  const fetchPlaces = async () => {
    try {
      const url = '/api/v1/places';

      const options = {
        params: {
          searchString: `${debouncedText}`,
        },
      };

      const { data } = await axios.get(url, options);

      return data;
    } catch (error) {
      console.error(error);
      throw new Error('Failed to fetch location. Close and try again.');
    }
  };

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ['places', debouncedText],
    queryFn: fetchPlaces,
    enabled: !!debouncedText,
  });

  return {
    isLoading,
    data,
    isError,
    error,
  };
};
