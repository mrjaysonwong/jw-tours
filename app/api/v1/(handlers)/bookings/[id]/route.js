import mongoose from 'mongoose';

// internal imports
import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/common';
import Booking from '@/models/bookingModel';
import Tour from '@/models/tourModel';
import { handleApiError, HttpError } from '@/helpers/errorHelpers';

// GET: /api/v1/bookings/[id]
export async function GET(Request, { params }) {
  const bookingId = params.id;

  if (!mongoose.isValidObjectId(bookingId)) {
    return Response.json(
      { message: 'Invalid booking ID format' },
      { status: STATUS_CODES.BAD_REQUEST }
    );
  }

  try {
    const session = await validateSession();
    const userId = session.user.id;

    // connect to database
    await connectMongo();

    const booking = await Booking.findOne({
      _id: bookingId,
      booker: userId,
    }).populate({
      path: 'tour',
      populate: {
        path: 'guide',
        select: 'firstName lastName languages',
      },
    });

    if (!booking) {
      return Response.json(
        { message: 'Booking not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: booking }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
