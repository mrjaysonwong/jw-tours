const API_BASE_URL = '/api/v1';

export const API_URLS_MAP = {
  AUTH: `${API_BASE_URL}/auth`,
  USERS: `${API_BASE_URL}/users`,
  ADMIN: `${API_BASE_URL}/admin`,
  GUIDES: `${API_BASE_URL}/guides`,
  TOURS: `${API_BASE_URL}/tours`,
  SEARCH_TOURS: `${API_BASE_URL}/tours/search`,
  BOOKINGS: `${API_BASE_URL}/bookings`,
  CHECKOUTS: `${API_BASE_URL}/checkouts`,
  PAYMENTS: `${API_BASE_URL}/payments`,
  REFUNDS: `${API_BASE_URL}/refunds`,
  REVIEWS: `${API_BASE_URL}/reviews`,
  WISHLISTS: `${API_BASE_URL}/wishlists`,
  GUEST: `${API_BASE_URL}/guest`,
};

export const API_URLS = new Proxy(API_URLS_MAP, {
  get(target, prop) {
    if (!(prop in target)) {
      throw new Error(`[API_URLS] Invalid key "${String(prop)}"`);
    }
    return target[prop];
  },
});

Object.freeze(API_URLS);