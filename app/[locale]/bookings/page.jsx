import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// internal imports
import { auth } from '@/auth';
import { getAuthFetchOptions } from '@/helpers/pageHelpers';
import Bookings from '@/app/(features)/bookings/Bookings';
import { fetchUserBookings } from '@/services/bookings/fetchBookings';
import { bookingsParams } from '@/constants/queryParams';
import { sanitizeQueryParams } from '@/utils/queryParams';

export const metadata = { title: 'My Bookings' };

export default async function BookingsPage({ searchParams }) {
  const session = await auth();
  if (!session) redirect('/signin');

  const options = getAuthFetchOptions(cookies);

  const queryParams = sanitizeQueryParams(searchParams, bookingsParams, {
    isServerComponent: true,
  });

  const userId = session.user.id;
  const bookings = await fetchUserBookings({
    userId,
    options,
    queryString: queryParams.toString(),
  });

  return <Bookings bookings={bookings} />;
}
