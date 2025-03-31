// internal imports
import { findUserEmail } from '@/services/user/userQueries';
import { rateLimiter } from '@/services/rate-limiter/rateLimiter';
import { HttpError } from '@/helpers/errorHelpers';
import { handleRateLimitError } from '@/helpers/errorHelpers';
import { generateEmailVerificationData } from '@/services/auth/generateEmailVerificationData';
import { ACTIONS, STATUS_CODES } from '@/constants/common';
import { manageUserEmailToken } from '@/services/token/manageUserEmailToken';
import { sendEmail } from '@/services/email/sendEmail';

function getSubject(actionType) {
  switch (actionType) {
    case ACTIONS.SIGNIN:
      return 'JW Tours Sign-in Link';

    case ACTIONS.FORGOT_PASSWORD:
      return 'Password Reset Request';

    default:
      return 'Verify your JW Tours account';
  }
}

export async function sendEmailLink(email, actionType, callbackUrl) {
  try {
    const userExists = await findUserEmail({ email });

    let statusCode;

    if (userExists) {
      const isSuspended = userExists.status === 'suspended';

      if (isSuspended) {
        throw new HttpError({
          message: 'Your account has been suspended. Please contact support.',
          status: STATUS_CODES.FORBIDDEN,
        });
      }

      const isSignInOrForgot =
        actionType === ACTIONS.SIGNIN || actionType === ACTIONS.FORGOT_PASSWORD;

      const isVerified = userExists.email.some(
        (e) => e.isVerified && isSignInOrForgot
      );

      const isPending =
        userExists.status === 'pending' && actionType === ACTIONS.SIGNUP;

      if (isVerified || isPending) {
        await rateLimiter.consume(email, 1);

        const {
          token,
          epochTime: expireTimestamp,
          emailHtml,
        } = generateEmailVerificationData({
          email,
          actionType,
          firstName: userExists.firstName,
          callbackUrl,
        });

        const userTokenExists = await manageUserEmailToken(
          userExists._id,
          email,
          token,
          expireTimestamp
        );

        // Send the email content
        await sendEmail({
          to: email,
          subject: getSubject(actionType),
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
