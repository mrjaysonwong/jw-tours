import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';

// internal imports
import GuideProfile from '@/app/(features)/tour-guides/GuideProfile';
import GuidesByLocation from '@/app/(features)/tour-guides/GuidesByLocation';
import Custom404 from '@/components/errors/Custom404';

async function fetchTours(guideId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tours?guideId=${guideId}`
    );

    if (res.status === 500) throw new Error('Failed to fetch tours');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchBookings(guideId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bookings?guideId=${guideId}`
    );

    if (res.status === 500) throw new Error('Failed to fetch bookings');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchGuideDetails(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/guides/${id}`
    );

    if (res.status === 500) throw new Error('Failed to fetch guide details');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchGuidesByLocation(city) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/guides?city=${city}`
    );

    if (res.status === 500) throw new Error('Failed to fetch guides list');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export default async function GuidesSlugPage({ params: { slug } }) {
  noStore();
  const [city, section, name, id] = slug;

  if (slug.length > 1 && slug.length < 4) {
    redirect('/tour-guides');
  }

  if (id) {
    const guide = await fetchGuideDetails(id);

    if (!guide) return <Custom404 resource="guide" />;

    const bookings = await fetchBookings(id);
    const tours = await fetchTours(id);

    return <GuideProfile guide={guide} bookings={bookings} tours={tours} />;
  } else if (city) {
    const guides = await fetchGuidesByLocation(city);

    if (guides.length === 0) return <Custom404 resource="guides" />;

    return <GuidesByLocation guides={guides} />;
  }
}
