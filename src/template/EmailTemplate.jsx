import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import React from 'react';

export function EmailTemplate(props) {
  const { url, email, otp, firstName, formattedDateString, mode } = props;

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const isSignUp = mode === 'signup';
  const isEmailOTP = mode === 'otp';
  const isEmailSignIn = mode === 'signin';

  const links = [
    { href: `${baseUrl}/blog`, label: 'Blog' },
    { href: 'www.facebook.com', label: 'Facebook' },
    { href: `${baseUrl}/contact`, label: 'Contact Us' },
  ];

  //   const newUrl = new URL(url);

  //   const baseUrl = newUrl.origin;
  //   const pathName = newUrl.pathname;
  //   const email = newUrl.searchParams.get('email');
  //   const token = newUrl.searchParams.get('token');
  //   const type = newUrl.searchParams.get('type');

  return (
    <>
      <Html>
        <Head />
        {isSignUp ? (
          <Preview>Your verification link for JW Tours</Preview>
        ) : isEmailOTP ? (
          <Preview>Your JW Tours OTP code</Preview>
        ) : (
          <Preview>Your sign-in link for JW Tours</Preview>
        )}

        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1713597998/jwtours/logo/JW_Tours_Email_Logo_rahcr4.png"
              width="42"
              height="42"
              alt="JW Tours"
              style={logo}
            />
            {isSignUp && (
              <>
                <Heading style={heading}>Account Verification</Heading>
                <Text style={paragraph}>{email}</Text>

                <Section style={buttonContainer}>
                  <Button style={button} href={url} target="_blank">
                    Verify
                  </Button>
                </Section>

                <Text style={paragraph}>
                  This link will be valid for 5 minutes till{' '}
                  <b>{formattedDateString}</b>.
                  <br />
                  If you did not request this email, there is nothing to worry
                  about - you can safely ignore it.
                </Text>
              </>
            )}

            {isEmailOTP && (
              <>
                <Heading style={heading}>Hi {firstName},</Heading>

                <Text style={paragraph}>
                  Please verify your email address with the following code:
                </Text>

                <Section style={codeContainer}>
                  <Text style={code}>{otp}</Text>
                </Section>

                <Text style={paragraph}>
                  This OTP code will be valid for 5 minutes till{' '}
                  <b>{formattedDateString}</b>.
                  <br />
                  If you did not request this email, there is nothing to worry
                  about - you can safely ignore it.
                </Text>
              </>
            )}

            {isEmailSignIn && (
              <>
                <Heading style={heading}>
                  Your sign-in link for JW Tours
                </Heading>

                <Section style={buttonContainer}>
                  <Button style={button} href={url} target="_blank">
                    Sign In
                  </Button>
                </Section>
                <Text style={paragraph}>
                  This link will be valid for 5 minutes till{' '}
                  <b>{formattedDateString}</b>.
                  <br />
                  If you did not request this email, there is nothing to worry
                  about - you can safely ignore it.
                </Text>
              </>
            )}

            <Hr style={hr} />

            <Section style={linkContainer}>
              {links.map((link, index) => (
                <Link key={index} href={link.href} style={linkStyle}>
                  {index > 0 && <span style={pipeStyle}>|</span>}
                  {link.label}
                </Link>
              ))}
            </Section>

            <Text style={footer}>© 2024 JW Tours. All rights reserved.</Text>
          </Container>
        </Body>
      </Html>
    </>
  );
}

const logo = {
  width: 'auto',
  height: 'auto',
};

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI","Roboto","Oxygen","Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '40px 20px',
  maxWidth: '560px',
};

const heading = {
  fontSize: '24px',
  letterSpacing: '-0.5px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#484848',
  padding: '17px 0 0',
};

const paragraph = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
};

const codeContainer = {
  background: 'rgba(0,0,0,.05)',
  borderRadius: '4px',
  margin: '16px 14px',
  width: '280px',
};

const code = {
  color: '#000',
  display: 'inline-block',
  fontFamily: 'monospace',
  fontSize: '32px',
  fontWeight: 700,
  letterSpacing: '6px',
  lineHeight: '40px',
  paddingBottom: '8px',
  paddingTop: '8px',
  margin: '0 auto',
  width: '100%',
  textAlign: 'center',
};

const buttonContainer = {
  padding: '27px 0 27px',
};

const button = {
  backgroundColor: '#5e6ad2',
  borderRadius: '3px',
  fontWeight: '600',
  color: '#fff',
  fontSize: '15px',
  textDecoration: 'none',
  textAlign: 'center',
  display: 'block',
  padding: '11px 23px',
  maxWidth: '150px',
};

const hr = {
  borderColor: '#dfe1e4',
  margin: '42px 0 26px',
};

const linkContainer = {
  textAlign: 'center',
};

const linkStyle = {
  fontSize: '14px',
  color: '#b4becc',
};

const pipeStyle = {
  color: '#b4becc',
  margin: '8px',
};

const footer = {
  textAlign: 'center',
  fontSize: '10px',
  color: '#b4becc',
};
