import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';

export async function fetchGuidesByLocation(city) {
  try {
    return safeFetch(`${BASE_URL}/api/v1/guides?city=${city}`);
  } catch (error) {
    throw error;
  }
}

export async function fetchGuideDetails(guideId) {
  try {
    return safeFetch(`${BASE_URL}/api/v1/guides/${guideId}`);
  } catch (error) {
    throw error;
  }
}
