import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';
import { API_URLS } from '@/constants/apiRoutes';

export async function fetchCheckout({ checkoutId, options }) {
  const url = `${BASE_URL}/${API_URLS.CHECKOUTS}/${checkoutId}`;

  return safeFetch(url, options);
}
