import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';

// internal imports
import GuideProfile from '@/app/(features)/tour-guides/GuideProfile';
import GuidesByLocation from '@/app/(features)/tour-guides/GuidesByLocation';
import Custom404 from '@/components/errors/Custom404';
import { fetchGuideBookings } from '@/services/bookings/fetchBookings';
import {
  fetchGuidesByLocation,
  fetchGuideDetails,
} from '@/services/guides/fetchGuides';
import { fetchTours } from '@/services/tours/fetchTours';

export default async function GuidesSlugPage({ params: { slug } }) {
  noStore();
  const [city, section, name, guideId] = slug;

  if (slug.length > 1 && slug.length < 4) {
    redirect('/tour-guides');
  }

  if (guideId) {
    const guide = await fetchGuideDetails(guideId);

    if (!guide) return <Custom404 resource="guide" />;

    const bookings = await fetchGuideBookings(guideId);
    const tours = await fetchTours({ guideId });

    return <GuideProfile guide={guide} bookings={bookings} tours={tours} />;
  } else if (city) {
    const guides = await fetchGuidesByLocation(city);

    if (!guides?.length) return <Custom404 resource="guides" />;

    return <GuidesByLocation guides={guides} />;
  }
}
