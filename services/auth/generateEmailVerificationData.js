// third-party imports
import { render } from '@react-email/render';

// internal imports
import { generateOpaqueToken } from '@/services/token/generateToken';
import { formatDate } from '@/utils/formats/formatDates';
import { EmailTemplate } from '@/templates/EmailTemplate';
import { BASE_URL } from '@/constants/env';

export function generateEmailVerificationData({
  email,
  actionType,
  firstName,
  callbackUrl,
}) {
  // Generate Token
  const { token, expireTimestamp } = generateOpaqueToken();

  const formattedDateString = formatDate(expireTimestamp);
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

  const url =
    actionType === 'forgot-password'
      ? `${BASE_URL}/reset-password?token=${token}`
      : `${BASE_URL}/verify?token=${token}&email=${encodedEmail}&action=${action}&callbackUrl=${callbackUrl}`;

  const emailHtml = render(
    <EmailTemplate
      url={url}
      formattedDateString={formattedDateString}
      action={actionType}
      firstName={firstName}
    />
  );

  return { token, expireTimestamp, emailHtml };
}
