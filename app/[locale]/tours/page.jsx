import { unstable_noStore as noStore } from 'next/cache';

// internal imports
import TopDestinations from '@/app/(features)/tours/TopDestinations';
import { locales } from '@/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata = {
  title: 'Top Destinations',
};

async function fetchTours() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tours`);

    if (res.status === 500) throw new Error('Failed to fetch tours');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export default async function ToursPage() {
  noStore();
  const tours = await fetchTours();

  return <TopDestinations tours={tours} />;
}
