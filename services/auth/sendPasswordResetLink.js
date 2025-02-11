// internal imports
import { findUserEmail } from '@/services/user/userQueries';
import { rateLimiter } from '@/services/rate-limiter/rateLimiter';
import { handleRateLimitError } from '@/helpers/errorHelpers';
import { generateEmailVerificationData } from '@/services/auth/generateEmailVerificationData';
import { ACTION_TYPES } from '@/constants/api';
import { manageUserEmailToken } from '@/services/token/manageUserEmailToken';
import { sendEmail } from '@/services/email/sendEmail';

export async function sendPasswordResetLink(email) {
  try {
    const userExists = await findUserEmail({ email });
    let statusCode;

    if (userExists) {
      const isVerified = userExists.email.find((e) => e.isVerified === true);

      if (isVerified) {
        await rateLimiter.consume(email, 1);

        const {
          token,
          epochTime: expireTimestamp,
          emailHtml,
        } = generateEmailVerificationData({
          email,
          actionType: ACTION_TYPES.FORGOT_PASSWORD,
          firstName: userExists.firstName,
        });

        const userTokenExists = await manageUserEmailToken(
          userExists._id,
          email,
          token,
          expireTimestamp
        );

        // Send the password reset email
        await sendEmail({
          to: email,
          subject: 'Password Reset Request',
          html: emailHtml,
        });

        statusCode = userTokenExists ? 200 : 201;
      }

      return statusCode;
    }
  } catch (error) {
    handleRateLimitError(error);

    throw error;
  }
}
