import connectMongo from '@/lib/connection';
import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import jwt from 'jsonwebtoken';
import { generateToken } from '@/utils/helper/token-handlers/generateToken';
import { hash } from 'bcryptjs';
import { sendEmail } from '@/utils/config/sendEmail';
import { formattedDate } from '@/utils/helper/formats/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/src/template/EmailTemplate';
import { signUpSchema } from '@/lib/validation/yup/signUpSchema';
import { getValidationError } from '@/utils/helper/errorHandler';

export async function POST(Request) {
  try {
    await connectMongo();

    const body = await Request.json();
    const { firstName, lastName, email, password, confirmPassword } = body;

    await signUpSchema.validate({ ...body }, { abortEarly: false });

    const userExists = await User.findOne({ 'email.email': email });

    if (userExists) {
      return Response.json(
        { message: 'Email already taken.' },
        { status: 409 }
      );
    }

    const hashedPassword = await hash(password, 12);
    // Create an email verification token
    const token = generateToken(email);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Request.user = decoded;

    const { exp: expires } = Request.user;
    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);
    const encodedEmail = encodeURIComponent(email);

    const mode = 'signup';
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}&email=${encodedEmail}&mode=${mode}`;

    const emailHtml = render(
      <EmailTemplate
        url={url}
        formattedDateString={formattedDateString}
        mode={mode}
      />
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
      { message: `Verification link sent to ${email}`, email: email },
      { status: 201 }
    );
  } catch (error) {
    getValidationError(error);

    console.error(error);

    return Response.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
