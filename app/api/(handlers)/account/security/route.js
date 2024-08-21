import { auth } from '@/auth';
import connectMongo from '@/lib/connection';
import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { hash, compare } from 'bcryptjs';
import { authEmailToken } from '@/utils/helper/token-handlers/tokenActions';
import { sendEmail } from '@/utils/config/sendEmail';

export async function POST(Request) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        { statusText: 'Unauthorized! You must signin first.' },
        { status: 401 }
      );
    }

    const { id: userId, email, name } = session?.user;
    const [firstName, lastName] = name.split(' ');

    const searchParams = Request.nextUrl.searchParams;
    const action = searchParams.get('action');

    const { token, epochTime, emailHtml } = authEmailToken(
      email,
      Request,
      action,
      firstName
    );

    await Token.create({
      userId: userId,
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
      subject: 'Password reset request',
      html: emailHtml,
    });

    return Response.json(
      { statusText: `Password reset link has been sent to ${email}` },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { statusText: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function PATCH(Request) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        { statusText: 'Unauthorized! You must signin first.' },
        { status: 401 }
      );
    }

    const userId = session?.user?.id;

    await connectMongo();

    const userExists = await User.findById(userId);

    if (!userExists) {
      return Response.json({ statusText: 'User not found.' }, { status: 404 });
    }

    const { currentPassword, password: newPassword } = await Request.json();

    const passwordsMatch = await compare(currentPassword, userExists.password);

    if (!passwordsMatch) {
      return Response.json(
        { statusText: 'The current password you entered is incorrect.' },
        { status: 400 }
      );
    }

    const isNewPasswordSameAsOld = await compare(
      newPassword,
      userExists.password
    );

    if (isNewPasswordSameAsOld) {
      return Response.json(
        {
          statusText:
            'The new password cannot be the same as the current password.',
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(newPassword, 12);

    await User.updateOne(
      { _id: userId },
      {
        $set: {
          password: hashedPassword,
        },
      }
    );

    return Response.json(
      { statusText: 'Successfully Updated' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      { statusText: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
