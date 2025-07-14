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
import * as React from 'react';
import { BASE_URL } from '@/constants/env';

export function EmailTemplate({
  url,
  email,
  otp,
  firstName,
  formattedDateString,
  action,
  isAdmin,
}) {
  const isSignUp = action === 'signup';
  const isGenOTP = action === 'gen-otp';
  const isEmailSignIn = action === 'signin';
  const isForgotPassword = action === 'forgot-password';

  const links = [
    { href: 'www.facebook.com', label: 'Facebook' },
    { href: 'www.instagram.com', label: 'Instagram' },
    { href: `${BASE_URL}/about`, label: 'About Us' },
    { href: `${BASE_URL}/contact`, label: 'Contact Us' },
  ];

  return (
    <>
      <Html>
        <Head />
        {isSignUp ? (
          <Preview>Your verification link for JW Tours</Preview>
        ) : isGenOTP ? (
          <Preview>Your JW Tours OTP code</Preview>
        ) : isForgotPassword ? (
          <Preview>Password reset request</Preview>
        ) : (
          <Preview>Your sign-in link for JW Tours</Preview>
        )}

        <Body style={main}>
          <Container style={container}>
            <Img
              src="https://res.cloudinary.com/dpyxciwcu/image/upload/v1727771494/jwtours/logo/Email_Logo_ygmnb1.svg"
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

            {isGenOTP && (
              <>
                <Heading style={heading}>Hi {firstName},</Heading>

                <Text style={paragraph}>
                  Please verify{' '}
                  {isAdmin ? 'account deletion' : 'your email address'} with the
                  following code:
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

            {isForgotPassword && (
              <>
                <Text style={greetings}>Hi {firstName},</Text>

                <Text style={paragraph}>
                  We received a request to reset your password. Click below to
                  set a new password:
                </Text>

                <Section style={buttonContainer}>
                  <Button style={button} href={url} target="_blank">
                    Reset password
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
  width: '140px',
  height: '64px',
};

const main = {
  backgroundColor: '#fff',
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

const greetings = {
  margin: '0 0 15px',
  fontSize: '15px',
  lineHeight: '1.4',
  color: '#3c4149',
  padding: '30px 0 0',
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
  backgroundColor: '#235835',
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
