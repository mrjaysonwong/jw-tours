import { bookingRequestSchema } from '@/validation/yup/tour/bookingRequestSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/services/db/connectMongo';
import Booking from '@/models/bookingModel';
import Tour from '@/models/tourModel';
import { formatUTC } from '@/utils/formats/formatDates';
import { STATUS_CODES } from '@/constants/common';
import { validateSessionAdminRole } from '@/services/auth/validateSessionAdminRole';

// GET: /api/v1/bookings
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const tourId = searchParams?.get('tourId');
  const guideId = searchParams?.get('guideId');

  try {
    // connect to database
    await connectMongo();

    let bookings;

    if (tourId) {
      bookings = await Booking.find({ tour: tourId }).select('tourDate -_id');
    } else if (guideId) {
      const bookingsList = await Booking.find({})
        .select('tour tourDate -_id')
        .populate({
          path: 'tour',
          select: 'guide duration', // Only fetch the guide field
        });

      bookings = bookingsList.filter(
        (booking) => booking.tour?.guide?.toString() === guideId
      );
    } else {
      await validateSessionAdminRole('GET');

      bookings = await Booking.find({});
    }

    if (!bookings || bookings.length === 0) {
      return Response.json(
        { data: bookings, message: 'Bookings not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: bookings }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}

// POST: /api/v1/bookings
export async function POST(Request) {
  try {
    const requestData = await Request.json();

    await bookingRequestSchema.validate(
      { ...requestData },
      { abortEarly: false }
    );

    // connect to database
    await connectMongo();

    await Booking.create({
      tour: requestData.tourId,
      user: requestData.userId,
      tourDate: formatUTC(requestData.tourDate),
    });

    return Response.json({ message: 'Booking confirmed!' }, { status: 201 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
