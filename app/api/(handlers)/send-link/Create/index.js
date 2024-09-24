import { sendEmail } from '@/services/sendEmail';
import { rateLimiter } from '@/services/rateLimiter';
import { getLocalMessage } from '@/helpers/errorHelpers';
import { findUserEmail, findUserVerifiedEmail } from '@/helpers/query/User';
import { authEmailToken } from '@/helpers/token-handlers/tokenActions';
import { handleUserTokenLink } from '@/helpers/token-handlers/tokenActions';
import { HttpError } from '@/helpers/errorHelpers';
import { emailSignInSchema } from '@/helpers/validation/yup/schemas/signInSchema';
import { getValidationError } from '@/helpers/errorHelpers';
import { handleRateLimitError } from '@/helpers/errorHelpers';

export async function sendSignInLink(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const action = searchParams.get('action');

  try {
    const validActions = ['signin', 'signup'];

    if (!validActions.includes(action)) {
      throw new HttpError({
        message: getLocalMessage('Missing or invalid parameters.'),
        status: 400,
      });
    }

    const { email } = await Request.json();

    await emailSignInSchema.validate({ email }, { abortEarly: false });

    const userExists = await findUserEmail({ email });

    if (!userExists) {
      throw new HttpError({
        message: getLocalMessage('Email must be verified.'),
        status: 403,
      });
    }

    const emailIsVerified = await findUserVerifiedEmail({ email });

    if (action === 'signin') {
      if (!emailIsVerified) {
        throw new HttpError({
          message: getLocalMessage('Email must be verified.'),
          status: 403,
        });
      }
    } else if (action === 'signup') {
      if (emailIsVerified) {
        throw new HttpError({
          message: getLocalMessage('Account has been already verified.'),
          status: 422,
        });
      }
    }

    await rateLimiter.consume(email, 1);

    const {
      token,
      epochTime: expireTimestamp,
      emailHtml,
    } = authEmailToken({ email, Request, action });

    const userTokenExists = await handleUserTokenLink(
      userExists._id,
      email,
      token,
      expireTimestamp
    );

    const subjectText =
      action === 'signin'
        ? 'JW Tours Sign-in link'
        : 'JW Tours Account Verification';

    // server-side environment
    await sendEmail({
      to: email,
      subject: subjectText,
      html: emailHtml,
    });

    const message =
      action === 'signin'
        ? `A sign-in link has been sent to ${email}`
        : `Verification link has been sent to ${email}`;

    const statusCode = userTokenExists ? 200 : 201;

    return { message, statusCode, email };
  } catch (error) {
    console.error('Failed to send signin link:', error.message);
    getValidationError(error);
    handleRateLimitError(error);

    throw error;
  }
}
