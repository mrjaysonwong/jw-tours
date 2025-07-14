import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// internal imports
import { auth } from '@/auth';
import { getAuthFetchOptions } from '@/helpers/pageHelpers';
import { fetchBookingDetails } from '@/services/bookings/fetchBookings';
import BookingDetails from '@/app/(features)/bookings/BookingDetails';

export const metadata = { title: 'My Booking' };

export default async function BookingDetailsPage({ params }) {
  const bookingId = params.id;

  const session = await auth();
  if (!session) redirect('/signin');

  const options = getAuthFetchOptions(cookies);

  const booking = await fetchBookingDetails(bookingId, options);

  if (!booking) redirect('/bookings');

  return <BookingDetails booking={booking} />;
}
