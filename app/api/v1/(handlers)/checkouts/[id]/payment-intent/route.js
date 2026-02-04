// internal imports
import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/lib/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import Checkout from '@/models/checkoutModel';
import Tour from '@/models/tourModel';
import User from '@/models/userModel';
import Booking from '@/models/bookingModel';
import {
  createPaymentMethod,
  createPaymentIntent,
  attachToPaymentIntent,
} from '@/services/payments/payment-intent/paymentIntent';
import { nanoid } from '@/lib/nanoid';

const transactionId = `TXN-${nanoid()}`;

// POST: /api/v1/checkouts/[id]/payment-intent
export async function POST(Request, { params }) {
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

    const paymentMethodRes = await createPaymentMethod({ data });
    const paymentIntentRes = await createPaymentIntent({ data });

    const attachRes = await attachToPaymentIntent(
      paymentMethodRes.data,
      paymentIntentRes.data
    );

    const paymentId = attachRes.data.attributes.payments[0].id;
    const paymentMethod = paymentMethodRes.data.attributes.type;

    const paymentSnapshot = {
      ...data.paymentSnapshot,
      paymentMethod,
    };

    await Booking.create({
      tour: data.booking.tour,
      booker: data.booking.booker,
      paymentIntentId: attachRes.data.id,
      paymentId,
      transactionId,
      bookingRequest: data.booking.bookingRequest,
      contact: data.booking.contact,
      meetingAndPickup: data.booking.meetingAndPickup,
      paymentSnapshot,
      status: 'pending',
    });

    return Response.json(
      { message: 'Payment initialized', transactionId },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
