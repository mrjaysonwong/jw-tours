// third-party imports
import { render } from '@react-email/render';

// internal imports
import { sendEmail } from '@/services/email/sendEmail';
import { BookingConfirmationTemplate } from '@/templates/BookingConfirmationTemplate';
import Booking from '@/models/bookingModel';
import User from '@/models/userModel';
import Tour from '@/models/tourModel';
import { formatISOlong } from '@/utils/formats/formatDates';
import { formatNumber } from '@/utils/formats/common';

export async function sendBookingConfirmationEmail({
  paymentIntentId,
  attributes,
}) {
  const paymentSource = attributes.data.attributes.source.type;
  const paymentMethod =
    paymentSource === 'maya'
      ? 'Maya'
      : paymentSource === 'gcash'
      ? 'GCash'
      : 'Debit/Credit Card';

  const booking = await Booking.findOne({ paymentIntentId })
    .populate({
      path: 'booker',
      select: 'firstName lastName email',
    })
    .populate({
      path: 'tour',
      select: 'title duration',
    });


  const primaryEmail = booking.booker.email.find((e) => e.isPrimary === true);
  const bookingId = booking?.bookingId;
  const customerFirstName = booking?.booker?.firstName;
  const tourName = booking.tour.title;
  const tourDate = booking.bookingRequest.tourDate;
  const tourDuration = `${booking.tour.duration.value} ${booking.tour.duration.unit}`
  const tourTime = booking.bookingRequest.startTime;
  const participants = booking.bookingRequest.partySize;
  const amount = `${booking.paymentSnapshot.currencySymbol} ${formatNumber(
    booking.paymentSnapshot.convertedAmount
  )} ${booking.paymentSnapshot.currencyCode}`;
  const paymentId = booking?.paymentId;

  const emailHtml = render(
    <BookingConfirmationTemplate
      bookingId={bookingId}
      customerFirstName={customerFirstName}
      tourName={tourName}
      tourDate={formatISOlong(tourDate)}
      tourDuration={tourDuration}
      tourTime={tourTime}
      participants={participants}
      amount={amount}
      paymentId={paymentId}
      paymentMethod={paymentMethod}
    />
  );

  await sendEmail({
    to: primaryEmail.email,
    subject: 'Booking Confirmation | JW Tours',
    html: emailHtml,
  });
}
