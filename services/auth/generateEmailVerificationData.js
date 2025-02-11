// third-party imports
import jwt from 'jsonwebtoken';
import { render } from '@react-email/render';

// internal imports
import { generateToken } from '@/services/token/generateToken';
import { formatDate } from '@/utils/formats/formatDates';
import { EmailTemplate } from '@/templates/EmailTemplate';

export function generateEmailVerificationData({
  email,
  actionType,
  firstName,
  callbackUrl,
}) {
  // Generate and Authenticate Email Token
  const token = generateToken(email);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const expires = decoded.exp;

  const epochTime = expires * 1000; // convert to milliseconds
  const formattedDateString = formatDate(epochTime);
  const encodedEmail = encodeURIComponent(email);

  let action;

  switch (actionType) {
    case 'signin':
      action = 'signin';
      break;
    case 'forgot-password':
      action = 'reset-password';
      break;
    default:
      action = 'signup';
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const url =
    actionType === 'forgot-password'
      ? `${baseUrl}/reset-password?token=${token}`
      : `${baseUrl}/verify?token=${token}&email=${encodedEmail}&action=${action}&callbackUrl=${callbackUrl}`;

  const emailHtml = render(
    <EmailTemplate
      url={url}
      formattedDateString={formattedDateString}
      action={actionType}
      firstName={firstName}
    />
  );

  return { token, epochTime, emailHtml };
}
