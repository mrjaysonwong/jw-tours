// third-party imports
import { unstable_noStore as noStore } from 'next/cache';

// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import Booking from '@/models/bookingModel';
import { sendBookingConfirmationEmail } from '@/services/bookings/sendBookingConfirmationEmail';
import { sendBookingCancellationEmail } from '@/services/bookings/sendBookingCancellationEmail';

// POST: /api/v1/webhooks/paymongo
export async function POST(Request) {
  noStore();

  try {
    const { data } = await Request.json();
    const { attributes } = data;
    const type = attributes.type;
    const paymentIntentId = attributes.data.attributes.payment_intent_id;
    const paymentId = attributes.data.attributes.payment_id;

    switch (type) {
      case 'payment.paid':
        await Booking.updateOne(
          { paymentIntentId },
          { status: 'confirmed', paymentStatus: 'paid' }
        );

        await sendBookingConfirmationEmail({
          paymentIntentId,
          attributes,
        });

        break;

      case 'payment.failed':
        await Booking.updateOne(
          { paymentIntentId },
          { status: 'failed', paymentStatus: 'failed' }
        );
        break;

      case 'payment.refund.updated':
        await Booking.updateOne(
          { paymentId },
          { status: 'cancelled', paymentStatus: 'refund' }
        );

        await sendBookingCancellationEmail({ paymentId });
        break;

      default:
        return Response.json(
          { message: `Unhandled webhook type: ${type}` },
          { status: 400 }
        );
    }

    return Response.json(null, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
