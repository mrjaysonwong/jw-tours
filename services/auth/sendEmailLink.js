// internal imports
import { findUserEmail } from '@/services/user/userQueries';
import { rateLimiter } from '@/services/rate-limiter/rateLimiter';
import { handleRateLimitError } from '@/helpers/errorHelpers';
import { generateEmailVerificationData } from '@/services/auth/generateEmailVerificationData';
import { ACTION_TYPES } from '@/constants/api';
import { manageUserEmailToken } from '@/services/token/manageUserEmailToken';
import { sendEmail } from '@/services/email/sendEmail';

function generateSubjectTitle(actionType) {
  switch (actionType) {
    case ACTION_TYPES.SIGNIN:
      return 'JW Tours Sign-in Link';

    case ACTION_TYPES.FORGOT_PASSWORD:
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
      const isSignInOrForgot =
        actionType === ACTION_TYPES.SIGNIN ||
        actionType === ACTION_TYPES.FORGOT_PASSWORD;

      const isVerified = userExists.email.some(
        (e) => e.isVerified && isSignInOrForgot
      );

      const isPending =
        userExists.status === 'pending' && actionType === ACTION_TYPES.SIGNUP;

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
          subject: generateSubjectTitle(actionType),
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
