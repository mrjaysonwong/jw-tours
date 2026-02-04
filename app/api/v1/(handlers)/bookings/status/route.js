import connectMongo from '@/lib/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import Booking from '@/models/bookingModel';
import { validateSession } from '@/services/auth/validateSession';

// GET: /api/v1/bookings/status
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const transactionId = searchParams?.get('transactionId')?.toUpperCase();

  try {
    const session = await validateSession();

    // connect to database
    await connectMongo();

    const booking = await Booking.findOne({
      transactionId,
      booker: session.user.id,
    });

    if (!booking) {
      return Response.json(
        { message: 'Booking not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json(
      { paymentStatus: booking.paymentStatus, status: booking.status },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
