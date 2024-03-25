import connectMongo from '@/lib/connection';
import User from '@/app/model/userModel';
import Token from '@/app/model/tokenModel';
import jwt from 'jsonwebtoken';
import { generateToken } from '@/utils/generateToken';
import { formattedDate } from '@/utils/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/src/template/EmailTemplate';
import { sendEmail } from '@/utils/config/sendEmail';

export async function PATCH(Request) {
  try {
    await connectMongo();

    const { email } = await Request.json();

    const userExists = await User.findOne({ 'email.email': email });

    if (!userExists) {
      return Response.json(
        {
          error: {
            message: 'User Not Found',
          },
        },
        { status: 400 }
      );
    }

    const token = generateToken(email);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Request.user = decoded;

    const { exp: expires } = Request.user;

    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);
    const encodedEmail = encodeURIComponent(email);

    const mode = 'signin';
    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}&email=${encodedEmail}&mode=${mode}`;

    const emailHtml = render(
      <EmailTemplate
        url={url}
        formattedDateString={formattedDateString}
        mode={mode}
      />
    );

    const userId = userExists._id;

    const userTokenExists = await Token.findOne({ userId });

    if (userTokenExists) {
      await Token.findOneAndUpdate(
        { 'email.email': email },
        {
          $set: {
            'email.$.token': token,
            'email.$.expireTimestamp': epochTime,
          },
        },
        { new: true }
      );
    } else {
      // create User Token and set fields
      await Token.create({
        userId,
        email: [
          {
            email: email,
            token: token,
            expireTimestamp: epochTime,
          },
        ],
      });
    }

    // server-side environment
    await sendEmail({
      to: email,
      subject: 'JW Tours Sign-in link',
      html: emailHtml,
    });

    return Response.json(
      { message: `A sign-in link has been sent to ${email}` },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    throw error.message;
  }
}
