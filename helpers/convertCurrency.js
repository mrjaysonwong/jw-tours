import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';

export async function convertCurrency(code, amounts = []) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amounts }),
  };

  return safeFetch(`${BASE_URL}/api/v1/currency?code=${code}`, options);
}
