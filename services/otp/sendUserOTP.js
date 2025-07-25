// third-party imports
import { render } from '@react-email/render';

// internal imports
import {
  findUserEmail,
  findUserPhoneNumber,
} from '@/services/users/userQueries';
import { handleRateLimitError, HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import { rateLimiter } from '@/libs/rateLimiter';
import { createOrUpdateOTP } from '@/services/otp/createOrUpdateOTP';
import { formatDate } from '@/utils/formats/formatDates';
import { sendEmail } from '@/services/email/sendEmail';
import { sendSMS } from '@/services/sms/sendSMS';
import { EmailTemplate } from '@/templates/EmailTemplate';
import { ACTIONS } from '@/constants/common';

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
        message: 'This email is already in use. Please choose another.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    await rateLimiter.consume(userEmail, 1);

    const { otp, epochTimeExpires, statusCode } = await createOrUpdateOTP({
      userId,
      email: userEmail,
    });

    const formattedDateString = formatDate(epochTimeExpires);

    const emailHtml = render(
      <EmailTemplate
        otp={otp}
        firstName={firstName}
        formattedDateString={formattedDateString}
        action={ACTIONS.GEN_OTP}
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

export async function sendMobileOTP({ data, userId, userExists }) {
  try {
    const { dialCode, phoneNumber } = data.phone;
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

       /* discontinue, currently using firebase otp */
    // const { otp, statusCode } = await createOrUpdateOTP({
    //   userId,
    //   dialCode,
    //   phoneNumber,
    // });

    // await sendSMS({ outbound, otp });

    // return statusCode;
    const statusCode = 200;

      return statusCode;
  } catch (error) {
    handleRateLimitError(error);

    throw error;
  }
}
