import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
  Button,
  Link,
} from '@react-email/components';

export function BookingConfirmationTemplate({
  customerFirstName,
  bookingId,
  tourName,
  tourDate,
  tourDuration,
  tourTime,
  participants,
  amount,
  paymentId,
  paymentMethod,
  supportEmail = 'support@jw-tours.com',
  downloadLink = '#',
  bookingLink = '#',
  manageBookingLink = '#',
  appName = 'JW Tours',
  websiteUrl = 'https://jw-tours.vercel.app',
  facebookUrl = 'https://facebook.com/yourapp',
  instagramUrl = 'https://instagram.com/yourapp',
}) {
  return (
    <Html>
      <Head />
      <Preview>
        Your booking is confirmed - {tourName} on {tourDate}
      </Preview>
      <Body
        style={{
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f6f9fc',
          color: '#333',
        }}
      >
        <Container
          style={{
            padding: '20px',
            backgroundColor: '#ffffff',
            maxWidth: '600px',
            margin: '0 auto',
          }}
        >
          <Heading as="h2">Hi {customerFirstName},</Heading>

          <Text>
            Thank you for booking with <strong>{appName}</strong>! We're excited
            to have you on board for your upcoming adventure.
          </Text>

          <Section>
            <Heading as="h3">📌 Booking Confirmation</Heading>
            <Hr />
            <Text>
              <strong>🔖 Booking ID:</strong> {bookingId}
            </Text>
            <Text>
              <strong>📍 Tour:</strong> {tourName}
            </Text>
            <Text>
              <strong>📅 Date:</strong> {tourDate}
            </Text>
            <Text>
              <strong>🕒 Duration:</strong> {tourDuration}
            </Text>
            <Text>
              <strong>🕒 Time:</strong> {tourTime}
            </Text>
            <Text>
              <strong>👥 Participants:</strong> {participants}
            </Text>
          </Section>

          <Section>
            <Heading as="h3">💳 Payment Summary</Heading>
            <Hr />
            <Text>
              <strong>Payment Status:</strong> ✅ Paid
            </Text>
            <Text>
              <strong>Amount Paid:</strong> {amount}
            </Text>
            <Text>
              <strong>Payment Method:</strong> {paymentMethod}
            </Text>
            <Text>
              <strong>Payment ID:</strong> {paymentId}
            </Text>
          </Section>

          <Section>
            <Heading as="h3">📄 Receipt / Official Confirmation</Heading>
            <Hr />
            <Text>
              You can download your official receipt below. This serves as proof
              of payment and confirmation of your booking.
            </Text>
            <Button href={downloadLink} style={{ marginBottom: '10px' }}>
              ➡️ Download Receipt PDF
            </Button>
            <Button href={bookingLink}>➡️ View Booking Details</Button>
          </Section>

          <Section>
            <Heading as="h3">🛑 Need to Cancel?</Heading>
            <Text>
              You may cancel your booking up to <strong>24 hours before</strong>{' '}
              the tour for a full refund. Visit your dashboard or click below:
            </Text>
            <Button href={manageBookingLink}>🔗 Manage Booking</Button>
          </Section>

          <Section>
            <Heading as="h3">📬 What's Next?</Heading>
            <Text>
              • A local guide will reach out 1-2 days before your trip.
            </Text>
            <Text>
              • Bring your booking reference and a valid ID on the tour date.
            </Text>
          </Section>

          <Section>
            <Text>
              If you have any questions, contact us at{' '}
              <Link href={`mailto:${supportEmail}`}>{supportEmail}</Link> or
              chat with us via the app.
            </Text>
            <Text>See you soon! 🌍</Text>
          </Section>

          <Hr />

          <Text>
            —<br />
            <strong>{appName} Team</strong>
            <br />
            <Link href={websiteUrl}>{websiteUrl}</Link> |{' '}
            <Link href={facebookUrl}>Facebook</Link> |{' '}
            <Link href={instagramUrl}>Instagram</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
