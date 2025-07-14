import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';
import { API_URLS } from '@/constants/apiRoutes';

export async function fetchTourDetails(tourId) {
  const url = `${BASE_URL}/${API_URLS.TOURS}/${tourId}`;

  return safeFetch(url);
}

export async function fetchTours({ geoLocation, destination, guideId, query }) {
  const searchParams = new URLSearchParams(query ?? '');

  if (geoLocation) searchParams.set('geoLocation', geoLocation);
  if (destination) searchParams.set('destination', destination);
  if (guideId) searchParams.set('guideId', guideId);

  const url = `${BASE_URL}/${API_URLS.TOURS}?${searchParams.toString()}`;

  return safeFetch(url);
}
