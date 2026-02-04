import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

// internal imports
import TopDestinations from '@/app/(features)/tours/TopDestinations';
import { locales } from '@/navigation';
import { getCurrencyFromCookies } from '@/helpers/pageHelpers';
import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';
import { API_URLS } from '@/constants/apiRoutes';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Top Destinations',
};

async function fetchTours(options) {
  const url = `${BASE_URL}${API_URLS.TOURS}?top_destination=true`;

  return safeFetch(url, options);
}

export default async function ToursPage() {
  noStore();
  const currency = getCurrencyFromCookies(cookies);

  const options = {
    headers: {
      'x-currency': encodeURIComponent(JSON.stringify(currency)),
    },
  };

  const tours = await fetchTours(options);

  return <TopDestinations tours={tours} />;
}
