// third-party imports
import { render } from '@react-email/render';

// internal imports
import { sendEmail } from '@/services/email/sendEmail';
import BookingCancellationTemplate from '@/templates/BookingCancellationTemplate';
import Booking from '@/models/bookingModel';
import User from '@/models/userModel';
import Tour from '@/models/tourModel';
import { formatISOlong } from '@/utils/formats/formatDates';
import { formatNumber } from '@/utils/formats/common';

export async function sendBookingCancellationEmail({ paymentId }) {
  const booking = await Booking.findOne({ paymentId })
    .populate({
      path: 'booker',
      select: 'firstName lastName email',
    })
    .populate({
      path: 'tour',
      select: 'title',
    });

  const paymentMethodSnapshot = booking.paymentSnapshot.paymentMethod;

  const paymentMethod =
    paymentMethodSnapshot === 'maya'
      ? 'Maya'
      : paymentMethodSnapshot === 'gcash'
      ? 'GCash'
      : 'Debit/Credit Card';

  const primaryEmail = booking.booker.email.find((e) => e.isPrimary === true);

  const bookingId = booking?.bookingId;
  const customerFirstName = booking.booker.firstName;
  const tourName = booking.tour.title;
  const tourDate = booking.bookingRequest.tourDate;
  const amount = `${booking.paymentSnapshot.currencySymbol} ${formatNumber(
    booking.paymentSnapshot.convertedAmount
  )} ${booking.paymentSnapshot.currencyCode}`;

  const emailHtml = render(
    <BookingCancellationTemplate
      bookingId={bookingId}
      customerFirstName={customerFirstName}
      tourName={tourName}
      tourDate={formatISOlong(tourDate)}
      amount={amount}
      paymentMethod={paymentMethod}
    />
  );

  await sendEmail({
    to: primaryEmail.email,
    subject: 'Booking Cancellation Confirmation | JW Tours',
    html: emailHtml,
  });
}
