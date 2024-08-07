import Token from '@/model/tokenModel/tokenModel';
import {
  getValidationError,
  handleRateLimitError,
} from '@/utils/helper/errorHandler';
import { emailSchema } from '@/lib/validation/yup/personalDetailsSchema';
import {
  createOTP,
  updateOTP,
} from '@/utils/helper/token-handlers/tokenActions';
import { formattedDate } from '@/utils/helper/formats/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/src/template/EmailTemplate';
import { sendEmail } from '@/utils/config/sendEmail';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { findUserByEmail, findUserById } from '@/utils/helper/query/User';
import { HttpError } from '@/utils/helper/errorHandler';

const opts = {
  points: 1,
  duration: 60, // 60 secs per request
};

const rateLimiter = new RateLimiterMemory(opts);

export async function addEmailAddress(Request, userId) {
  try {
    const { email } = await Request.json();

    await emailSchema.validate({ email }, { abortEarly: false });

    const emailTaken = await findUserByEmail(email);

    if (emailTaken) {
      throw new HttpError({
        message: 'Email already taken.',
        status: 409,
      });
    }

    const userExists = await findUserById(userId);

    await rateLimiter.consume(email, 1);

    let otp;
    let epochTimeExpires;
    let statusCode;

    const foundUserToken = await Token.findOne({ 'email.email': email });

    if (!foundUserToken) {
      const { otp: genOTP, expires: genExpires } = await createOTP(
        userId,
        email
      );

      otp = genOTP;
      epochTimeExpires = genExpires;
      statusCode = 201;
    } else {
      const { otp: genOTP, expires: genExpires } = await updateOTP(
        userId,
        email
      );

      otp = genOTP;
      epochTimeExpires = genExpires;
      statusCode = 200;
    }

    const formattedDateString = formattedDate(epochTimeExpires);

    const firstName = userExists.firstName;
    const action = 'gen-otp';

    const emailHtml = render(
      <EmailTemplate
        otp={otp}
        firstName={firstName}
        formattedDateString={formattedDateString}
        action={action}
      />
    );

    await sendEmail({
      to: email,
      subject: 'JW Tours Email Verification',
      html: emailHtml,
    });

    return { statusCode };
  } catch (error) {
    console.error(error);

    getValidationError(error);
    handleRateLimitError(error);

    throw error;
  }
}
