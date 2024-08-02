import connectMongo from '@/lib/connection';
import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { hash } from 'bcryptjs';
import { sendEmail } from '@/utils/config/sendEmail';
import { signUpSchema } from '@/lib/validation/yup/signUpSchema';
import { findUserByEmail } from '@/utils/helper/query/User';
import { authEmailToken } from '@/utils/helper/token-handlers/tokenActions';

export async function POST(Request) {
  try {
    await connectMongo();

    const body = await Request.json();
    const { firstName, lastName, email, password, confirmPassword } = body;

    await signUpSchema.validate({ ...body }, { abortEarly: false });

    const userExists = await findUserByEmail(email);

    if (userExists) {
      return Response.json(
        { statusText: 'Email Already Taken' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);

    const action = 'signup';

    const { token, epochTime, emailHtml } = authEmailToken(
      email,
      Request,
      action
    );

    const newUser = await User.create({
      firstName,
      lastName,
      email: [
        {
          email: email,
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
          email: email,
          token: token,
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

    return Response.json(
      { statusText: `Verification link sent to ${email}`, email: email },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      return Response.json({ statusText: error.errors }, { status: 400 });
    }

    return Response.json(
      { statusText: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
