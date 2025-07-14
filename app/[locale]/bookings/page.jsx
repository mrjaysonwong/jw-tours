import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// internal imports
import { auth } from '@/auth';
import { getAuthFetchOptions } from '@/helpers/pageHelpers';
import Bookings from '@/app/(features)/bookings/Bookings';
import { fetchUserBookings } from '@/services/bookings/fetchBookings';
import { fetchUserTourReviews } from '@/services/reviews/fetchReviews';

export const metadata = { title: 'My Bookings' };

const allowedParams = [
  'tourFrom',
  'tourTo',
  'bookingFrom',
  'bookingTo',
  'status',
  'sort',
];

export default async function BookingsPage({ searchParams }) {
  const session = await auth();
  if (!session) redirect('/signin');

  const options = getAuthFetchOptions(cookies);

  const queryParams = new URLSearchParams();

  for (const key of allowedParams) {
    const value = searchParams[key];

    // skipped undefined value
    if (value) queryParams.set(key, value);
  }

  const query = queryParams.size > 0 ? `?${queryParams.toString()}` : '';

  const userId = session.user.id;
  const bookings = await fetchUserBookings({ userId, options, query });

  const reviews = await fetchUserTourReviews({ userId });

  // const duplicatedBookings = Array.from({ length: 5 }).flatMap(() =>
  //   bookings.map((b) => ({ ...b }))
  // );

  return <Bookings bookings={bookings} reviews={reviews} />;
}
