// internal imports
import { findUserEmail } from '@/services/users/userQueries';
import { rateLimiter } from '@/libs/rateLimiter';
import { handleRateLimitError } from '@/helpers/errorHelpers';
import { generateEmailVerificationData } from '@/services/auth/generateEmailVerificationData';
import { ACTIONS } from '@/constants/common';
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
           expireTimestamp,
          emailHtml,
        } = generateEmailVerificationData({
          email,
          actionType: ACTIONS.FORGOT_PASSWORD,
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
