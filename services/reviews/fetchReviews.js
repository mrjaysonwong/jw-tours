import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';
import { API_URLS } from '@/constants/apiRoutes';

export async function fetchUserTourReviews({ userId }) {
  const url = `${BASE_URL}/${API_URLS.REVIEWS}?userId=${userId}`;

  return safeFetch(url);
}
