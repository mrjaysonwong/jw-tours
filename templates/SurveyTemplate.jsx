import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Button,
  Link,
} from '@react-email/components';

export function SurveyTemplate() {
  return (
    <Html>
      <Head />
      <Body
        style={{
          fontFamily: 'Arial, sans-serif',
          backgroundColor: '#f2f2f2',
          padding: '20px',
        }}
      >
        <Container
          style={{
            backgroundColor: '#ffffff',
            padding: '20px',
            borderRadius: '5px',
            maxWidth: '600px',
            margin: 'auto',
          }}
        >
          <Heading as="h1" style={{ textAlign: 'center', color: '#ff9900' }}>
            Amazon
          </Heading>
          <Heading as="h2" style={{ fontSize: '20px', marginBottom: '10px' }}>
            Dear John Doe,
          </Heading>
          <Text>
            Greetings! We are the User Experience Research team at Amazon, and
            we would like to hear about your recent shopping experience at
            Amazon through a quick 5-minute survey. Your input is crucial in
            improving the shopping experience for millions of customers on
            Amazon. We promise that we will review each response carefully.
          </Text>
          <Text>
            Rest assured that your feedback will be kept anonymous and
            confidential. Participating in this survey will not impact your
            relationship with Amazon. Please click the Start Survey button below
            to begin.
          </Text>
          <Button
            href="#"
            style={{
              backgroundColor: '#ff9900',
              color: '#ffffff',
              padding: '10px 20px',
              borderRadius: '5px',
              textDecoration: 'none',
              fontWeight: 'bold',
            }}
          >
            Start Survey
          </Button>
          <Text>
            Your participation in the survey is voluntary, and all your
            information will be subject to Amazon's{' '}
            <Link href="#">Privacy Notice</Link>. If you have any concerns about
            the authenticity of this email or want to learn more about Amazon’s
            survey program, please visit the
            <Link href="#"> Amazon Customer Service </Link> page.
          </Text>
          <Text style={{ fontSize: '12px', color: '#888888' }}>
            © 2024 Amazon.com, Inc. or its affiliates. Amazon and all related
            marks are trademarks of Amazon.com, Inc. or its affiliates.
            Amazon.com 410 Terry Avenue N., Seattle, WA 98109.
          </Text>
          <Link href="#" style={{ fontSize: '12px', color: '#0073e6' }}>
            Update your preferences
          </Link>{' '}
          |
          <Link href="#" style={{ fontSize: '12px', color: '#0073e6' }}>
            {' '}
            Unsubscribe
          </Link>
        </Container>
      </Body>
    </Html>
  );
}
