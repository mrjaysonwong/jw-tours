import { unstable_noStore as noStore } from 'next/cache';
import { cookies } from 'next/headers';

// internal imports
import TourDetails from '@/app/(features)/tours/tour-details/TourDetails';
import Custom404 from '@/components/errors/Custom404';
import TourListing from '@/app/(features)/tours/TourListing';
import { cleanSlug } from '@/utils/formats/common';
import { getCurrencyFromCookies } from '@/helpers/pageHelpers';
import { fetchTours, fetchTourDetails } from '@/services/tours/fetchTours';
import { fetchTourBookings } from '@/services/bookings/fetchBookings';
import { convertCurrency } from '@/helpers/convertCurrency';

const allowedParams = ['minDuration', 'maxDuration', 'transportation', 'sort'];

const ITEMS_PER_PAGE = 16;

export async function generateMetadata({ params: { slug } }) {
  const [geoLocation, destination, tourId] = slug;
  const tour = await fetchTourDetails(tourId);
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

const convertPricing = async (pricing, currencyCode) => {
  const { tourCost, serviceFee, perPersonFee = 0 } = pricing;

  const [cTour, cService, cPerson] = await convertCurrency(currencyCode, [
    tourCost,
    serviceFee,
    perPersonFee,
  ]);

  return {
    convertedPricing: {
      tourCost: cTour,
      serviceFee: cService,
      perPersonFee: cPerson,
    },
    convertedTotalCost: cTour + cService + cPerson,
  };
};

const handleTourDetails = async (tourId, currency) => {
  const tour = await fetchTourDetails(tourId);
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
  };
  return <TourDetails tour={updatedTour} bookings={bookings} />;
};

const handleTourListing = async (
  geoLocation,
  destination,
  currency,
  searchParams
) => {
  const queryParams = new URLSearchParams();

  for (const key of allowedParams) {
    const value = searchParams[key];

    // set if allowed params
    if (value) queryParams.set(key, value);
  }

  const query = queryParams.size > 0 ? `${queryParams.toString()}` : '';

  const tours = await fetchTours({ geoLocation, destination, query });

  const amounts = tours.map((t) => t.totalCost);
  const convertedAmounts = await convertCurrency(currency.code, amounts);

  const convertedTours = tours.map((tour, index) => ({
    ...tour,
    convertedTotalCost: convertedAmounts[index],
    currency,
  }));

  /* Demo for small-medium dataset */
  const duplicatedTours = Array.from({ length: 32 }).flatMap(() =>
    convertedTours.map((t) => ({ ...t }))
  );

  // Handle pagination
  const totalPages = Math.ceil(convertedTours.length / ITEMS_PER_PAGE);
  const currentPage = Math.max(1, parseInt(searchParams?.page || '1', 10));

  if (totalPages > 0 && currentPage > totalPages) {
    return <Custom404 resource="tours page" />;
  }

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedTours = convertedTours.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <TourListing
      tours={paginatedTours}
      page={currentPage}
      totalPages={totalPages}
      geoLocation={geoLocation}
      destination={destination}
      totalTours={convertedTours.length}
      searchParams={searchParams}
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
    : await handleTourListing(geoLocation, destination, currency, searchParams);
}
