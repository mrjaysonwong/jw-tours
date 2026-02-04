// internal imports
import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';
import { API_URLS } from '@/constants/apiRoutes';

export async function fetchTourBookings({ tourId, options, tourDate }) {
  const params = new URLSearchParams();

  if (tourDate) params.set('tourDate', tourDate);

  const url = `${BASE_URL}${
    API_URLS.TOURS
  }/${tourId}/bookings?${params.toString()}`;

  return safeFetch(url, options);
}

export async function fetchGuideBookings(guideId) {
  const url = `${BASE_URL}${API_URLS.GUIDES}/${guideId}/bookings`;

  return safeFetch(url);
}

export async function fetchUserBookings({
  userId,
  options,
  transactionId,
  queryString,
}) {
  const params = new URLSearchParams(queryString ?? '');

  if (transactionId) params.set('transactionId', transactionId);

  const url = `${BASE_URL}${
    API_URLS.USERS
  }/${userId}/bookings?${params.toString()}`;

  return safeFetch(url, options);
}

export async function fetchBookingDetails(bookingId, options) {
  const url = `${BASE_URL}${API_URLS.BOOKINGS}/${bookingId}`;

  return safeFetch(url, options);
}
