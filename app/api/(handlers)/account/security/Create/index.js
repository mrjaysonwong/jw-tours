import { auth } from '@/auth';
import Token from '@/model/tokenModel/tokenModel';
import User from '@/model/userModel/userModel';
import { sendEmail } from '@/utils/config/sendEmail';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getLocalMessage } from '@/utils/helper/errorHandler';
import { findUserByEmail } from '@/utils/helper/query/User';
import { authEmailToken } from '@/utils/helper/token-handlers/tokenActions';
import { HttpError } from '@/utils/helper/errorHandler';
import { emailSchema } from '@/lib/validation/yup/personalDetailsSchema';
import { getValidationError } from '@/utils/helper/errorHandler';
import { handleRateLimitError } from '@/utils/helper/errorHandler';

const opts = {
  points: 1,
  duration: 60, // 60 secs per request
};

const rateLimiter = new RateLimiterMemory(opts);

async function getSessionEmail(body, headers) {
  const headersList = headers();
  const referer = headersList.get('referer');

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
    });

    if (!userOwnedThisEmail) {
      throw new HttpError({
        message: 'Unauthorized! Email does not belong to the user.',
        status: 403,
      });
    }

    const [firstName] = name.split(' ');

    return { email, firstName };
  }
  // return empty object if referer !security
  return {};
}

async function handleUserToken(email, token, expireTimestamp, userId) {
  const userTokenExists = await Token.findOne({ userId });

  const targetEmail = userTokenExists?.email.find((e) => e.email === email);

  if (userTokenExists) {
    if (targetEmail) {
      await Token.updateOne(
        { userId, 'email.email': email },
        {
          $set: {
            'email.$': { email, token, expireTimestamp },
          },
        }
      );
    } else {
      await Token.updateOne(
        { userId },
        {
          $addToSet: {
            email: { email, token, expireTimestamp },
          },
        }
      );
    }
  } else {
    await Token.create({
      userId,
      email: [{ email, token, expireTimestamp }],
    });
  }

  return userTokenExists;
}

export async function sendPasswordResetLink(Request, headers) {
  try {
    const searchParams = Request.nextUrl.searchParams;
    const action = searchParams.get('action');

    const validActions = ['reset-password'];

    if (!validActions.includes(action)) {
      throw new HttpError({
        message: getLocalMessage('Invalid or missing parameters.'),
        status: 400,
      });
    }

    const body = await Request.json();
    await emailSchema.validate({ ...body }, { abortEarly: false });

    const { email: sessionEmail, firstName: sessionName } =
      await getSessionEmail(body, headers);

    const email = body.email || sessionEmail;

    const userExists = await findUserByEmail(email);

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
    } = authEmailToken(email, Request, action, firstName);

    const userTokenExists = await handleUserToken(
      email,
      token,
      expireTimestamp,
      userExists._id
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
