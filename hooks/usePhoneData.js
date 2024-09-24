import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

export function usePhoneData(userId) {
  const { data } = useSuspenseQuery({
    queryKey: ['phone', userId],
    queryFn: fetchPhones,
    enabled: !!userId
  });

  async function fetchPhones() {
    // const url = 'https://api.restful-api.dev/objects';

    const res = await fetch('https://api.restful-api.dev/objects');

    const { statusText, status } = res;

    if (!res.ok) {
      return { statusText, status };
    }

    const data = res.json();

    return data;
  }

  return { data };
}
