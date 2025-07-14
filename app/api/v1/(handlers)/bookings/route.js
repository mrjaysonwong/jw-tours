import { unstable_noStore as noStore } from 'next/cache';

// internal imports
import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import connectMongo from '@/libs/connectMongo';
import Booking from '@/models/bookingModel';
import Tour from '@/models/tourModel';

// GET: /api/v1/bookings
export async function GET(Request) {
  noStore();

  try {
    const session = await validateSession();

    // connect to database
    await connectMongo();
    await authorizeAdmin(session, 'GET');

    const bookings = await Booking.find({});

    if (!bookings?.length) {
      return Response.json(
        { message: 'Bookings not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: bookings }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
