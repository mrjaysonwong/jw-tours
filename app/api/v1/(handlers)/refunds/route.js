import { handleApiError } from '@/helpers/errorHelpers';
import { fetchPaymentIntent } from '@/services/payments/payment-intent/fetchPaymentIntent';
import { fetchRefunds } from '@/services/refunds/fetchRefunds';
import connectMongo from '@/lib/connectMongo';
import Booking from '@/models/bookingModel';

// POST: /api/v1/refunds
export async function POST(Request) {
  try {
    const { paymentIntentId, isCancellable, reasonForCancellation } =
      await Request.json();

    if (isCancellable) {
      const paymentIntentRes = await fetchPaymentIntent(paymentIntentId);

      const { attributes } = paymentIntentRes;
      const amount = attributes.amount;
      const paymentId = attributes.payments[0].id;
      const reason = 'requested_by_customer';

      await fetchRefunds(amount, paymentId, reason);

      // connect to database
      await connectMongo();

      await Booking.updateOne(
        { paymentId },
        { $set: { reasonForCancellation } }
      );

      return Response.json(
        { message: 'Refund was initiated' },
        { status: 201 }
      );
    } else {
      return Response.json(
        { message: 'Unable to process refund request.' },
        { status: 400 }
      );
    }
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
