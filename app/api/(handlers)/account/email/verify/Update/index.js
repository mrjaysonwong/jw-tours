import User from '@/models/userModel/userModel';
import Token from '@/models/tokenModel/tokenModel';
import { HttpError } from '@/helpers/errorHelpers';
import { getLocalMessage } from '@/helpers/errorHelpers';

export async function verifyAndAddEmail(Request, userId) {
  const searchParams = Request.nextUrl.searchParams;
  const email = searchParams.get('email');

  try {
    if (!email) {
      throw new HttpError({
        message: getLocalMessage('Invalid or missing email parameter'),
        status: 400,
      });
    }

    const emailExists = await User.findOne({
      _id: userId,
      'email.email': email,
    }).select('email.$');

    if (emailExists) {
      throw new HttpError({
        message: 'Email was already verified.',
        status: 422,
      });
    }

    const { otp } = await Request.json();

    if (!otp) {
      throw new HttpError({
        message: 'Input the OTP.',
        status: 400,
      });
    }

    const foundToken = await Token.findOne({
      userId,
      email: {
        $elemMatch: {
          email,
          token: otp,
        },
      },
    }).select('userId email.$');

    const currentTimestamp = Date.now(); // epochTime
    const expireTimestamp = foundToken?.email[0].expireTimestamp;

    if (!foundToken || expireTimestamp <= currentTimestamp) {
      throw new HttpError({
        message: 'Invalid or expired OTP',
        status: 401,
      });
    }

    await User.updateOne(
      { _id: userId },
      {
        $addToSet: {
          email: {
            email,
            isPrimary: false,
            isVerified: true,
          },
        },
      }
    );
  } catch (error) {
    console.error('Error while verifying email OTP.', error.message);
    throw error;
  }
}
