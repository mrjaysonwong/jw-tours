import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';
import { API_URLS } from '@/constants/apiRoutes';

export async function fetchTourDetails({ tourId }) {
  const url = `${BASE_URL}${API_URLS.TOURS}/${tourId}`;

  return safeFetch(url);
}

export async function fetchTourList({
  geoLocation,
  destination,
  guideId,
  queryString,
  options,
}) {
  const queryParams = new URLSearchParams(queryString ?? '');

  if (geoLocation) queryParams.set('geoLocation', geoLocation);
  if (destination) queryParams.set('destination', destination);
  if (guideId) queryParams.set('guideId', guideId);

  try {
    const url = `${BASE_URL}${API_URLS.TOURS}?${queryParams.toString()}`;

    const res = await fetch(url, options);

    if (res.status === 500) {
      throw new Error('Something went wrong');
    }

    const { data, pagination, locationExists } = await res.json();

    return { tours: data, pagination, locationExists };
  } catch (error) {
    throw error;
  }
}

export async function fetchSearchTours({ queryString, options }) {
  try {
    const url = `${BASE_URL}${API_URLS.SEARCH_TOURS}?${queryString}`;

    const res = await fetch(url, options, { cache: 'no-store' });

    if (res.status === 500) {
      throw new Error('Something went wrong');
    }

    const { data, pagination } = await res.json();

    return { tours: data, pagination };
  } catch (error) {
    throw error;
  }
}
