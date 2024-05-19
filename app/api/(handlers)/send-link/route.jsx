import connectMongo from '@/lib/connection';
import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import jwt from 'jsonwebtoken';
import { generateToken } from '@/utils/helper/generateToken';
import { formattedDate } from '@/utils/helper/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/src/template/EmailTemplate';
import { sendEmail } from '@/utils/config/sendEmail';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { unstable_noStore as noStore } from 'next/cache';

const opts = {
  points: 1,
  duration: 60, // 60 secs per request
};

const rateLimiter = new RateLimiterMemory(opts);

export async function PATCH(Request) {
  noStore();

  try {
    await connectMongo();

    const requestUrl = new URL(Request.url);
    const mode = requestUrl.searchParams.get('mode');
    const type = requestUrl.searchParams.get('type');

    const { email } = await Request.json();

    const userExists = await User.findOne({ 'email.email': email });

    if (!userExists) {
      return Response.json(
        {
          error: {
            message: 'Bad Request',
          },
        },
        { status: 403 }
      );
    }

    if (mode === 'signin' || (mode === 'signin' && type === 'resend')) {
      const isVerified = await User.findOne({
        'email.email': email,
        'email.isVerified': true,
      });

      if (!isVerified) {
        return Response.json(
          {
            error: {
              message: 'Bad Request',
            },
          },
          { status: 403 }
        );
      }
    }

    if (mode === 'signup') {
      const isVerified = await User.findOne({
        'email.email': email,
        'email.isVerified': true,
      });

      if (isVerified) {
        return Response.json(
          {
            error: {
              message: 'Bad Request',
            },
          },
          { status: 403 }
        );
      }
    }

    await rateLimiter.consume(email, 1);

    const token = generateToken(email);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Request.user = decoded;

    const { exp: expires } = Request.user;

    const epochTime = expires * 1000; // convert to milliseconds
    const formattedDateString = await formattedDate(epochTime);
    const encodedEmail = encodeURIComponent(email);

    const url = `${process.env.NEXT_PUBLIC_BASE_URL}/verify?token=${token}&email=${encodedEmail}&mode=${mode}`;

    const emailHtml = render(
      <EmailTemplate
        url={url}
        formattedDateString={formattedDateString}
        mode={mode}
      />
    );

    const userId = userExists._id;

    const tokenUserExists = await Token.findOne({ userId });

    if (tokenUserExists) {
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
      subject:
        mode === 'signin'
          ? 'JW Tours Sign-in link'
          : 'JW Tours Account Verification',
      html: emailHtml,
    });

    return Response.json(
      {
        message:
          mode === 'signin'
            ? `A sign-in link has been sent to ${email}`
            : `Verification link sent to ${email}`,
        email: email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    const rateLimited = error?.remainingPoints === 0;
    const timeLeft = Math.floor(error?.msBeforeNext / 1000);

    if (rateLimited) {
      return Response.json(
        {
          message: `One request per minute. Try again in ${timeLeft} seconds.`,
        },
        { status: 429 }
      );
    } else {
      return Response.json(
        { message: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
}
