import {
  getValidationError,
  handleRateLimitError,
} from '@/helpers/errorHelpers';
import { emailSchema } from '@/helpers/validation/yup/schemas/personalDetailsSchema';
import { formattedDate } from '@/utils/formats/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/templates/EmailTemplate';
import { sendEmail } from '@/services/sendEmail';
import { rateLimiter } from '@/services/rateLimiter';
import { findUserEmail } from '@/helpers/query/User';
import { HttpError } from '@/helpers/errorHelpers';
import { handleUserTokenOTP } from '@/helpers/token-handlers/tokenActions';

export async function sendEmailOTP(Request, userId, name) {
  try {
    const { email } = await Request.json();

    await emailSchema.validate({ email }, { abortEarly: false });

    const emailTaken = await findUserEmail({ email });

    if (emailTaken) {
      throw new HttpError({
        message: 'Email already taken.',
        status: 409,
      });
    }

    await rateLimiter.consume(email, 1);

    const { otp, epochTimeExpires, statusCode } = await handleUserTokenOTP({
      userId,
      email,
    });

    const formattedDateString = formattedDate(epochTimeExpires);

    const [firstName] = name.split(' ');
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
    getValidationError(error);
    handleRateLimitError(error);

    throw error;
  }
}
