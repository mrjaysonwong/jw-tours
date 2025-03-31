import { unstable_noStore as noStore } from 'next/cache';

// internal imports
import TourDetails from '@/app/(features)/tours/TourDetails';
import Custom404 from '@/components/errors/Custom404';
import FilteredTours from '@/app/(features)/tours/FilteredTours';

async function fetchBookings(tourId) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/bookings?tourId=${tourId}`
    );

    if (res.status === 500) throw new Error('Failed to fetch bookings');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchTours(geoLocation, destination) {
  try {
    const filters = destination
      ? `geolocation=${geoLocation}&destination=${destination}`
      : `geolocation=${geoLocation}`;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tours?${filters}`
    );

    if (res.status === 500) throw new Error('Failed to fetch tours');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

async function fetchTourDetails(id) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/tours/${id}`
    );

    if (res.status === 500) throw new Error('Failed to fetch tour details');

    const { data } = await res.json();

    return data;
  } catch (error) {
    throw error;
  }
}

export default async function ToursSlugPage({ params: { slug } }) {
  noStore();

  const [geoLocation, destination, id] = slug;

  if (id) {
    const tour = await fetchTourDetails(id);

    if (!tour) {
      return <Custom404 resource="tour" />;
    }

    const bookings = await fetchBookings(id);

    return <TourDetails tour={tour} bookings={bookings} />;
  } else {
    const tours = await fetchTours(geoLocation, destination);

    if (tours?.length === 0) {
      return <Custom404 resource="tours" />;
    }

    return <FilteredTours tours={tours} />;
  }
}
