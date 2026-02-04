import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';
import { API_URLS } from '@/constants/apiRoutes';

export async function fetchGuidesByLocation(city) {
  try {
    const url = `${BASE_URL}${API_URLS.GUIDES}?city=${city}`;

    return safeFetch(url);
  } catch (error) {
    throw error;
  }
}

export async function fetchGuideDetails(guideId) {
  try {
    const url = `${BASE_URL}${API_URLS.GUIDES}/${guideId}`;
    
    return safeFetch(url);
  } catch (error) {
    throw error;
  }
}
