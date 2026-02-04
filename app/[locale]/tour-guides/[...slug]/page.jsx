import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// internal imports
import GuideProfile from '@/app/(features)/tour-guides/GuideProfile';
import GuidesByLocation from '@/app/(features)/tour-guides/GuidesByLocation';
import Custom404 from '@/components/errors/Custom404';
import { fetchGuideBookings } from '@/services/bookings/fetchBookings';
import {
  fetchGuidesByLocation,
  fetchGuideDetails,
} from '@/services/guides/fetchGuides';
import { fetchTourList } from '@/services/tours/fetchTours';
import { getCurrencyFromCookies } from '@/helpers/pageHelpers';

export default async function GuidesSlugPage({ params: { slug } }) {
  noStore();

  const currency = getCurrencyFromCookies(cookies);
  const [city, section, name, guideId] = slug;

  if (slug.length > 1 && slug.length < 4) {
    redirect('/tour-guides');
  }

  if (guideId) {
    const guide = await fetchGuideDetails(guideId);

    if (!guide) return <Custom404 resource="guide" />;

    const bookings = await fetchGuideBookings(guideId);

    const options = {
      headers: {
        'x-currency': encodeURIComponent(JSON.stringify(currency)),
      },
    };

    const { tours } = await fetchTourList({ guideId, options });

    return <GuideProfile guide={guide} bookings={bookings} tours={tours} />;
  } else if (city) {
    const guides = await fetchGuidesByLocation(city);

    if (!guides?.length) return <Custom404 resource="guides" />;

    return <GuidesByLocation guides={guides} />;
  }
}
