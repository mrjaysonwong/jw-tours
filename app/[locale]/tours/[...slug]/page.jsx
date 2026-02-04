import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// internal imports
import TourDetails from '@/app/(features)/tours/tour-details/TourDetails';
import Custom404 from '@/components/errors/Custom404';
import TourList from '@/app/(features)/tours/TourList';
import { cleanSlug } from '@/utils/formats/common';
import { getCurrencyFromCookies } from '@/helpers/pageHelpers';
import { fetchTourList, fetchTourDetails } from '@/services/tours/fetchTours';
import { fetchTourBookings } from '@/services/bookings/fetchBookings';
import { convertPricing } from '@/helpers/convertCurrency';
import { fetchWishlist } from '@/services/wishlists/fetchWishlist';
import { baseTourListParams } from '@/constants/queryParams';
import { sanitizeQueryParams } from '@/utils/queryParams';

export async function generateMetadata({ params: { slug } }) {
  const [geoLocation, destination, tourId] = slug || [];

  let title = `Best Tours in ${cleanSlug(geoLocation)}`;

  if (destination) {
    title = `Best Tours in ${cleanSlug(geoLocation)} - ${cleanSlug(
      destination
    )}`;
  }

  if (tourId) {
    const tour = await fetchTourDetails(tourId);
    if (tour) {
      title = tour.title;
    }
  }
  return { title };
}

const handleTourDetails = async (tourId, currency) => {
  const { guest, user } = await fetchWishlist();
  const tour = await fetchTourDetails({ tourId });

  if (!tour) return <Custom404 resource="tour" />;

  const bookings = await fetchTourBookings({ tourId });

  const { convertedPricing, convertedTotalCost } = await convertPricing(
    tour.pricing,
    currency.code
  );

  const updatedTour = {
    ...tour,
    convertedPricing,
    convertedTotalCost,
    currency,
    wishlist: {
      guest,
      user,
    },
  };

  return <TourDetails tour={updatedTour} bookings={bookings} />;
};

const handleTourList = async (
  geoLocation,
  destination,
  currency,
  searchParams
) => {
  const queryParams = sanitizeQueryParams(searchParams, baseTourListParams, {
    isServerComponent: true,
  });

  const options = {
    headers: {
      'x-currency': encodeURIComponent(JSON.stringify(currency)),
    },
  };

  const { tours, pagination, locationExists } = await fetchTourList({
    geoLocation,
    destination,
    queryString: queryParams.toString(),
    options,
  });

  const { guest, user } = await fetchWishlist();

  const updatedTours = tours.map((tour) => ({
    ...tour,
    wishlist: {
      guest,
      user,
    },
  }));

  if (
    queryParams.has('page') &&
    (pagination.totalPages === 0 ||
      pagination.currentPage > pagination.totalPages)
  ) {
    queryParams.delete('page');
    redirect(`?${queryParams.toString()}`);
  }

  if (!tours.length && !locationExists) {
    return <Custom404 redirectPath="/tours" />;
  }

  return (
    <TourList
      tours={updatedTours}
      destination={destination}
      geoLocation={geoLocation}
      page={pagination.currentPage}
      totalPages={pagination.totalPages}
      totalTours={pagination.totalCount}
    />
  );
};

export default async function ToursSlugPage({
  params: { slug },
  searchParams,
}) {
  noStore();

  const currency = getCurrencyFromCookies(cookies);
  const [geoLocation, destination, tourId] = slug;

  return tourId
    ? await handleTourDetails(tourId, currency)
    : await handleTourList(geoLocation, destination, currency, searchParams);
}
