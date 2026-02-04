// internal imports
import { validateSession } from '@/services/auth/validateSession';
import { authorizeUser } from '@/services/auth/authorizeRole';
import connectMongo from '@/lib/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import Checkout from '@/models/checkoutModel';
import Tour from '@/models/tourModel';
import User from '@/models/userModel';
import { getExpireTimestamp } from '@/utils/common';

// POST: /api/v1/checkouts
export async function POST(Request) {
  const expireAt = getExpireTimestamp();

  try {
    const session = await validateSession();

    const {
      userId,
      tourId,
      guideId,
      tourCost,
      partySize,
      perPersonFee,
      totalPerPersonFee,
      serviceFee,
      totalCost,
      tourDate,
      startTime,
    } = await Request.json();

    // connect to database
    await connectMongo();
    await authorizeUser({ session, userId });

    const tour = await Tour.findById(tourId).select('_id');
    const guide = await User.findById(guideId).select('_id');

    if (!tour || !guide) {
      return Response.json(
        { message: `${!tour ? 'Tour' : 'Guide'} not found` },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    const newCheckout = await Checkout.create({
      booker: userId,
      tour: tourId,
      guide: guideId,
      bookingRequest: {
        tourCost,
        partySize,
        perPersonFee,
        totalPerPersonFee,
        serviceFee,
        totalCost,
        tourDate: new Date(tourDate),
        startTime,
      },
      expireAt,
    });

    return Response.json({ checkoutId: newCheckout._id }, { status: 201 });
  } catch (error) {
    console.error(error);
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
