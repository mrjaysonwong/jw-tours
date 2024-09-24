import { auth } from '@/auth';
import User from '@/models/userModel/userModel';
import { sendEmail } from '@/services/sendEmail';
import { rateLimiter } from '@/services/rateLimiter';
import { getLocalMessage } from '@/helpers/errorHelpers';
import { findUserEmail } from '@/helpers/query/User';
import { authEmailToken } from '@/helpers/token-handlers/tokenActions';
import { handleUserTokenLink } from '@/helpers/token-handlers/tokenActions';
import { HttpError } from '@/helpers/errorHelpers';
import { emailSchema } from '@/helpers/validation/yup/schemas/personalDetailsSchema';
import { getValidationError } from '@/helpers/errorHelpers';
import { handleRateLimitError } from '@/helpers/errorHelpers';

async function getSessionEmail(body, referer) {
  if (referer.includes('security')) {
    const session = await auth();

    if (!session) {
      throw new HttpError({
        message: 'Unauthorized! You must signin first.',
        status: 401,
      });
    }

    const { id: userId, email, name } = session.user;

    const userOwnedThisEmail = await User.findOne({
      _id: userId,
      email: { $elemMatch: { email: body.email } },
    }).select('email.$');

    if (!userOwnedThisEmail) {
      throw new HttpError({
        message: 'Forbidden! Email does not belong to the user.',
        status: 403,
      });
    }

    const [firstName] = name.split(' ');

    return { email, firstName };
  }
  // return empty object if referer !security
  return {};
}

export async function sendPasswordResetLink(Request, headers) {
  const searchParams = Request.nextUrl.searchParams;
  const action = searchParams.get('action');
  const headersList = headers();
  const referer = headersList.get('referer');

  try {
    const validActions = ['forgot-password'];

    if (!validActions.includes(action)) {
      throw new HttpError({
        message: getLocalMessage('Invalid or missing parameters.'),
        status: 400,
      });
    }

    const body = await Request.json();

    await emailSchema.validate({ ...body }, { abortEarly: false });

    const { email: sessionEmail, firstName: sessionName } =
      await getSessionEmail(body, referer);

    const email = body.email || sessionEmail;

    const userExists = await findUserEmail({ email });

    if (!userExists) {
      throw new HttpError({
        message: getLocalMessage('Email must be verified.'),
        status: 403,
      });
    }

    await rateLimiter.consume(email, 1);

    const firstName = sessionName || userExists.firstName;

    const {
      token,
      epochTime: expireTimestamp,
      emailHtml,
    } = authEmailToken({ email, Request, action, firstName });

    const userTokenExists = await handleUserTokenLink(
      userExists._id,
      email,
      token,
      expireTimestamp
    );

    // server-side environment
    await sendEmail({
      to: email,
      subject: 'Password reset request',
      html: emailHtml,
    });

    const statusCode = userTokenExists ? 200 : 201;

    return { statusCode, email };
  } catch (error) {
    console.error(error);
    getValidationError(error);
    handleRateLimitError(error);

    throw error;
  }
}
