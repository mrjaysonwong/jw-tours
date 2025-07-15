// internal imports
import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import Checkout from '@/models/checkoutModel';
import Tour from '@/models/tourModel';
import User from '@/models/userModel';
import { getReviewSummary } from '@/services/reviews/reviewSummary';

// GET: /api/v1/checkouts/[id]
export async function GET(Request, { params }) {
  const checkoutId = params.id;

  try {
    const session = await validateSession();

    // connect to database
    await connectMongo();

    const checkout = await Checkout.findOne({
      _id: checkoutId,
      booker: session.user.id,
    }).populate([
      {
        path: 'tour',
        select:
          'images title meetingLocation geoLocation pricing guide duration',
        populate: {
          path: 'guide',
          select: 'firstName lastName languages',
        },
      },
    ]);

    if (!checkout) {
      return Response.json(
        { message: 'Checkout not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    const tourId = checkout.tour._id;

    const { totalCount, avgRating } = await getReviewSummary(tourId);

    const updatedCheckout = {
      ...checkout.toObject(),
      reviewSummary: {
        reviewCount: totalCount,
        avgRating: +avgRating.toFixed(2),
      },
    };

    return Response.json({ data: updatedCheckout }, { status: 200 });
  } catch (error) {
    console.error(error)
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}

// PATCH: /api/v1/checkouts/id
export async function PATCH(Request, { params }) {
  const checkoutId = params.id;

  try {
    const session = await validateSession();
    const data = await Request.json();

    // connect to database
    await connectMongo();

    const checkout = await Checkout.findOne({
      _id: checkoutId,
      booker: session.user.id,
    });

    if (!checkout) {
      return Response.json(
        { message: 'Checkout not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    if (data.option) {
      await Checkout.updateOne(
        { _id: checkoutId },
        {
          $set: {
            meetingAndPickup: { option: data.option },
          },
        }
      );
    } else {
      await Checkout.updateOne(
        { _id: checkoutId },
        {
          $set: {
            contact: {
              fullName: data.fullName,
              email: data.email,
              phone: data.phone,
            },
          },
        }
      );
    }

    return Response.json(null, { status: 200 });
  } catch (error) {
    console.error(error)
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
