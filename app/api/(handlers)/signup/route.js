import connectMongo from '@/services/db/connectMongo';
import { createUserAccount } from './Create';

export async function POST(Request) {
  try {
    await connectMongo();

    const { email } = await createUserAccount(Request);

    return Response.json(
      {
        statusText: `Verification link has been sent to ${email}`,
        email: email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    const errorMessage = error.status
      ? error.message.split(',')
      : 'Internal Server Error';

    return Response.json(
      { statusText: errorMessage },
      { status: error.status ?? 500 }
    );
  }
}

// Sample demo for api and validation locales
/*
import connectMongo from '@/lib/connection';
import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { hash } from 'bcryptjs';
import { sendEmail } from '@/utils/config/sendEmail';
import { signUpSchema } from '@/lib/validation/yup/signUpSchema';
import { findUserByEmail } from '@/utils/helper/query/User';
import { authEmailToken } from '@/utils/helper/token-handlers/tokenActions';
import { getTranslations } from 'next-intl/server';
import { signUpTranslations } from '@/lib/validation/validationTranslations';
import { cookies } from 'next/headers';

export async function POST(Request) {
  const cookieStore = cookies();
  const { value: locale } = cookieStore.get('NEXT_LOCALE');

  let t;
  let t1;

  try {
    t = await getTranslations({ locale, namespace: 'signup_page' });
    t1 = await getTranslations({ locale, namespace: 'common' });

    await connectMongo();

    const body = await Request.json();
    const { firstName, lastName, email, password, confirmPassword } = body;

    const translations = signUpTranslations(t, t1);

    const schema = signUpSchema(translations);
    await schema.validate({ ...body }, { abortEarly: false });

    const userExists = await findUserByEmail(email);

    if (userExists) {
      return Response.json(
        { statusText: t1('errors.email_taken') },
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
      {
        statusText: t1('success_messages.verification_link_sent', { email }),

        email: email,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    if (error.name === 'ValidationError') {
      return Response.json({ statusText: error.errors }, { status: 400 });
    }

    return Response.json(
      { statusText: t1('errors.internal_server') },
      { status: 500 }
    );
  }
}

*/
