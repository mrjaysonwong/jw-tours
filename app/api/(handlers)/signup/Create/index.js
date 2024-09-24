import User from '@/models/userModel/userModel';
import Token from '@/models/tokenModel/tokenModel';
import { hash } from 'bcryptjs';
import { sendEmail } from '@/services/sendEmail';
import { signUpSchema } from '@/helpers/validation/yup/schemas/signUpSchema';
import { findUserEmail } from '@/helpers/query/User';
import { authEmailToken } from '@/helpers/token-handlers/tokenActions';
import { HttpError } from '@/helpers/errorHelpers';
import { getValidationError } from '@/helpers/errorHelpers';

export async function createUserAccount(Request) {
  try {
    const body = await Request.json();

    const { firstName, lastName, email, password, confirmPassword } = body;

    await signUpSchema.validate({ ...body }, { abortEarly: false });

    const emailTaken = await findUserEmail({ email });

    if (emailTaken) {
      throw new HttpError({
        message: 'Email already taken.',
        status: 409,
      });
    }

    const hashedPassword = await hash(password, 12);

    const action = 'signup';

    const { token, epochTime, emailHtml } = authEmailToken({
      email,
      Request,
      action,
    });

    const newUser = await User.create({
      firstName,
      lastName,
      email: [
        {
          email,
          isPrimary: true,
          isVerified: false,
        },
      ],
      password: hashedPassword,
    });

    await Token.create({
      userId: newUser._id,
      email: [
        {
          email,
          token,
          expireTimestamp: epochTime,
        },
      ],
    });

    // server-side environment
    await sendEmail({
      to: email,
      subject: 'JW Tours Account Verification',
      html: emailHtml,
    });

    return { email };
  } catch (error) {
    console.error('Account creation failed:', error.message);

    getValidationError(error);
    throw error;
  }
}
