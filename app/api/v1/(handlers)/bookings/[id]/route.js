import mongoose from 'mongoose';

// internal imports
import { auth } from '@/auth';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/common';
import connectMongo from '@/services/db/connectMongo';
import Booking from '@/models/bookingModel';
import Tour from '@/models/tourModel';
import { handleApiError, HttpError } from '@/helpers/errorHelpers';
import { findUserById } from '@/services/user/userQueries';

// GET: /api/v1/bookings/[id]
export async function GET(Request, { params }) {
  const bookingId = params.id;

  try {
    const session = await auth();

    if (!session) {
      throw new HttpError({
        message: ERROR_MESSAGES.UNAUTHORIZED,
        status: STATUS_CODES.UNAUTHORIZED,
      });
    }

    if (!mongoose.isValidObjectId(bookingId)) {
      return Response.json(
        { message: 'Invalid booking ID format' },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // connect to database
    await connectMongo();

    const booking = await Booking.findById(bookingId)
      .populate({
        path: 'tour',
        select: 'destination.name title pricing tourId duration transporation',
        populate: {
          path: 'guide',
          select: 'firstName lastName email.email role status',
        },
      })
      .populate('user', 'firstName lastName email.email role status');

    const bookerId = booking.user._id.toHexString();
    const isMatchId = session.user.id === bookerId;
    const isAdminRole = session.user.role === 'admin';

    await findUserById(bookerId);

    if (!isMatchId && !isAdminRole) {
      throw new HttpError({
        message: ERROR_MESSAGES.FORBIDDEN,
        status: STATUS_CODES.FORBIDDEN,
      });
    }

    if (!booking || booking.length === 0) {
      return Response.json(
        { data: booking, message: 'Booking not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: booking }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
