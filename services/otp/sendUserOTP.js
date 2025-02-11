// third-party imports
import { render } from '@react-email/render';

// internal imports
import {
  findUserEmail,
  findUserPhoneNumber,
} from '@/services/user/userQueries';
import { handleRateLimitError, HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/api';
import { rateLimiter } from '@/services/rate-limiter/rateLimiter';
import { createOrUpdateOTP } from '@/services/otp/createOrUpdateOTP';
import { formatDate } from '@/utils/formats/formatDates';
import { sendEmail } from '@/services/email/sendEmail';
import { sendSMS } from '@/services/sms/sendSMS';
import { EmailTemplate } from '@/templates/EmailTemplate';

function validateMaxContactLimit({ email, phone }) {
  const resource = email ? 'emails' : 'numbers';

  if (email?.length >= 5 || phone?.length >= 5) {
    throw new HttpError({
      message: `Cannot add more ${resource}; the maximum limit of ${resource} has been reached.`,
      status: STATUS_CODES.CONFLICT,
    });
  }
}

export async function sendEmailOTP({ email: userEmail, userId, userExists }) {
  try {
    const { firstName, email } = userExists;

    validateMaxContactLimit({ email });

    const emailExists = await findUserEmail({ email: userEmail });

    if (emailExists) {
      throw new HttpError({
        message: 'Email already exists.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    await rateLimiter.consume(userEmail, 1);

    const { otp, epochTimeExpires, statusCode } = await createOrUpdateOTP({
      userId,
      email: userEmail,
    });

    const formattedDateString = formatDate(epochTimeExpires);

    const action = 'gen-otp';

    const emailHtml = render(
      <EmailTemplate
        otp={otp}
        firstName={firstName}
        formattedDateString={formattedDateString}
        action={action}
      />
    );

    await sendEmail({
      to: userEmail,
      subject: 'JW Tours Email Verification',
      html: emailHtml,
    });

    return statusCode;
  } catch (error) {
    handleRateLimitError(error);

    throw error;
  }
}

export async function sendMobileOTP({ requestData, userId, userExists }) {
  try {
    const { dialCode, phoneNumber } = requestData.phone;
    const { phone } = userExists;

    validateMaxContactLimit({ phone });

    const outbound = `${dialCode}${phoneNumber}`;

    const phoneNumberExists = await findUserPhoneNumber({
      dialCode,
      phoneNumber,
    });

    if (phoneNumberExists) {
      throw new HttpError({
        message: 'Phone number already exists.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    await rateLimiter.consume(outbound, 1);

    const { otp, statusCode } = await createOrUpdateOTP({
      userId,
      dialCode,
      phoneNumber,
    });

    await sendSMS({ outbound, otp });

    return statusCode;
  } catch (error) {
    handleRateLimitError(error);

    throw error;
  }
}
