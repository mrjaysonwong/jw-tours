// third-party imports
import { compare } from 'bcryptjs';
import { render } from '@react-email/render';

// internal imports
import { STATUS_CODES } from '@/constants/common';
import { handleRateLimitError, HttpError } from '@/helpers/errorHelpers';
import { rateLimiter } from '@/lib/rateLimiter';
import { createOrUpdateOTP } from '@/services/otp/createOrUpdateOTP';
import { formatDate } from '@/utils/formats/formatDates';
import { sendEmail } from '@/services/email/sendEmail';
import { EmailTemplate } from '@/templates/EmailTemplate';
import Token from '@/models/tokenModel';
import { ACTIONS } from '@/constants/common';

export async function validatePassword(data, password) {
  try {
    const passwordsMatch = await compare(data.password, password);

    if (!passwordsMatch) {
      throw new HttpError({
        message: 'The password you entered is incorrect.',
        status: STATUS_CODES.BAD_REQUEST,
      });
    }
  } catch (error) {
    throw error;
  }
}

export async function sendEmailOTP(firstName, userId, userEmail) {
  try {
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
        isAdmin={true}
      />
    );

    await sendEmail({
      to: userEmail,
      subject: 'Two Factor Authentication - Account Deletion',
      html: emailHtml,
    });

    return statusCode;
  } catch (error) {
    handleRateLimitError(error);

    throw error;
  }
}

export async function verifyOTP(otp, adminId, adminEmail) {
  try {
    const foundToken = await Token.findOne({
      userId: adminId,
      email: {
        $elemMatch: {
          email: adminEmail,
          token: otp,
        },
      },
    }).select('userId email.$');

    const currentTimestamp = Date.now();
    const expireTimestamp = foundToken?.email[0].expireTimestamp;

    if (!foundToken || expireTimestamp <= currentTimestamp) {
      throw new HttpError({
        message: 'Invalid or expired OTP',
        status: STATUS_CODES.UNAUTHORIZED,
      });
    }
  } catch (error) {
    throw error;
  }
}
