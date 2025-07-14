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

export default function BookingCancellationTemplate({
  customerFirstName,
  tourName,
  bookingId,
  tourDate,
  amount,
  paymentMethod,
  manageBookingUrl = '#',
}) {
  return (
    <Html>
      <Head />
      <Preview>Your booking has been cancelled</Preview>
      <Body
        style={{
          fontFamily: 'Helvetica, Arial, sans-serif',
          backgroundColor: '#f9f9f9',
          padding: '20px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '8px',
            padding: '24px',
            maxWidth: '600px',
            margin: 'auto',
          }}
        >
          <Heading style={{ color: '#333', fontSize: '20px' }}>
            <Text>Hi {customerFirstName},</Text>
          </Heading>

          <Text>
            This email confirms that you have successfully cancelled your
            booking for <strong>{tourName}</strong> and your refund request has
            been submitted successfully.
          </Text>

          <Hr />

          <Section>
            <Heading as="h4" style={{ fontSize: '16px', marginBottom: '8px' }}>
              Booking Details
            </Heading>
            <Text>🔖 Booking ID: {bookingId}</Text>
            <Text>📅 Date: {tourDate}</Text>
          </Section>

          <Section style={{ marginTop: '16px' }}>
            <Heading as="h4" style={{ fontSize: '16px', marginBottom: '8px' }}>
              Refund Summary
            </Heading>
            <Text>💳 Payment Method: {paymentMethod}</Text>
            <Text>💰 Amount: {amount}</Text>
          </Section>

          <Hr />

          <Section style={{ marginTop: '16px' }}>
            <Text>
              You don't need to take any further action. The refunded amount
              will reflect in your account within 5-15 business days depending
              on your payment provider.
            </Text>

            <Button
              href={manageBookingUrl}
              style={{
                backgroundColor: '#00B960',
                color: '#ffffff',
                fontSize: '14px',
                borderRadius: '4px',
                padding: '12px 20px',
                marginTop: '16px',
                textDecoration: 'none',
              }}
            >
              View Booking Details
            </Button>
          </Section>

          <Hr />

          <Text style={{ fontSize: '12px', color: '#666' }}>
            If you have any questions or concerns, feel free to contact our
            support team at{' '}
            <Link href="mailto:support@jw-tours.com">support@jw-tours.com</Link>
            .
          </Text>

          <Text style={{ fontSize: '12px', color: '#666', marginTop: '16px' }}>
            — JW Tours Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
