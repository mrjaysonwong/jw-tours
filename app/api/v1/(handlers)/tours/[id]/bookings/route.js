import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import connectMongo from '@/lib/connectMongo';
import Booking from '@/models/bookingModel';
import Tour from '@/models/tourModel';

// GET: /api/v1/tours/[id]/bookings
export async function GET(Request, { params }) {
  const tourId = params.id;

  const searchParams = Request.nextUrl.searchParams;
  const tourDate = new Date(searchParams.get('tourDate'));

  try {
    // connect to database
    await connectMongo();

    let bookings;

    if (tourDate) {
      bookings = await Booking.find({
        tour: tourId,
        'bookingRequest.tourDate': tourDate,
      }).select('status');
    } else {
      bookings = await Booking.find({
        tour: tourId,
      })
        .populate({
          path: 'tour',
          select: 'duration',
        })
        .select('bookingRequest.tourDate');
    }

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
