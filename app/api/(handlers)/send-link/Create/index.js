import Token from '@/model/tokenModel/tokenModel';
import { sendEmail } from '@/utils/config/sendEmail';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { getLocalMessage } from '@/utils/helper/errorHandler';
import {
  findUserByEmail,
  findUserVerifiedEmail,
} from '@/utils/helper/query/User';
import { authEmailToken } from '@/utils/helper/token-handlers/tokenActions';
import { HttpError } from '@/utils/helper/errorHandler';
import { emailSignInSchema } from '@/lib/validation/yup/signInSchema';
import { getValidationError } from '@/utils/helper/errorHandler';
import { handleRateLimitError } from '@/utils/helper/errorHandler';
import { signInEmailTranslations } from '@/lib/validation/validationTranslations';

const opts = {
  points: 1,
  duration: 60, // 60 secs per request
};

const rateLimiter = new RateLimiterMemory(opts);

export async function createSigninLink(Request, action, t, t1) {
  try {
    const validActions = ['signin', 'signup'];

    if (!validActions.includes(action)) {
      throw new HttpError({
        message: getLocalMessage(t1('errors.missing_or_invalid_parameters'), t1),
        status: 400,
      });
    }

    const { email } = await Request.json();

    const translations = signInEmailTranslations(t1);

    const schema = emailSignInSchema(translations);
    await schema.validate({ email }, { abortEarly: false });

    const userExists = await findUserByEmail(email);

    if (!userExists) {
      throw new HttpError({
        message: t('errors.email_must_verified'),
        status: 403,
      });
    }

    const emailIsVerified = await findUserVerifiedEmail(email);

    if (action === 'signin') {
      if (!emailIsVerified) {
        throw new HttpError({
          message: t('errors.email_must_verified'),
          status: 403,
        });
      }
    } else if (action === 'signup') {
      if (emailIsVerified) {
        throw new HttpError({
          message: getLocalMessage(t('errors.already_verified'), t1),
          status: 422,
        });
      }
    }

    await rateLimiter.consume(email, 1);

    const {
      token,
      epochTime: expireTimestamp,
      emailHtml,
    } = authEmailToken(email, Request, action);

    const userId = userExists._id;

    const userTokenExists = await Token.findOne({ userId });

    const targetEmail = userTokenExists?.email.find((e) => e.email === email);

    if (userTokenExists) {
      if (targetEmail) {
        // Update the existing email object
        // Use field.$ positional operator
        await Token.updateOne(
          { userId, 'email.email': email },
          {
            $set: {
              'email.$': {
                email,
                token,
                expireTimestamp,
              },
            },
          }
        );
      } else {
        // Add a new email object
        await Token.updateOne(
          { userId },
          {
            $addToSet: {
              email: {
                email,
                token,
                expireTimestamp,
              },
            },
          }
        );
      }
    } else {
      // Create a new document
      await Token.create({
        userId,
        email: [
          {
            email: email,
            token: token,
            expireTimestamp: expireTimestamp,
          },
        ],
      });
    }

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
        ? t('success_messages.signin_link_sent', { email })
        : t1('success_messages:verification_link_sent', { email });

    const statusCode = userTokenExists ? 200 : 201;

    return { message, statusCode, email };
  } catch (error) {
    console.error(error);
    getValidationError(error);
    handleRateLimitError(error, t1);

    throw error;
  }
}
