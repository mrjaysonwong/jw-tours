import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { HttpError } from '@/utils/helper/errorHandler';
import { getLocalMessage } from '@/utils/helper/errorHandler';

export async function verifyEmailOTP(Request, userId) {
  try {
    const searchParams = Request.nextUrl.searchParams;
    const email = searchParams.get('email');

    if (!email) {
      throw new HttpError({
        message: getLocalMessage('Invalid or missing email parameter'),
        status: 400,
      });
    }

    const emailExists = await User.findOne({
      _id: userId,
      'email.email': email,
    });

    if (emailExists) {
      throw new HttpError({
        message: 'Email was already verified.',
        status: 422,
      });
    }

    const { otp } = await Request.json();

    const foundToken = await Token.findOne({
      userId,
      email: {
        $elemMatch: {
          email: email,
          token: otp,
        },
      },
    });

    const currentTimestamp = Date.now(); // epochTime
    const expireTimestamp = foundToken?.email[0].expireTimestamp;

    if (!foundToken || expireTimestamp <= currentTimestamp) {
      throw new HttpError({
        message: 'Invalid or expired OTP',
        status: 401,
      });
    }

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          email: {
            email: email,
            isPrimary: false,
            isVerified: true,
          },
        },
      },
      { new: true }
    );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
