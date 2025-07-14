// internal imports
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES} from '@/constants/common';
import User from '@/models/userModel';
import Token from '@/models/tokenModel';

export async function verifyAndAddEmail(otp, email, userId, userExists) {
  try {
    const emailExists = userExists?.email?.find((e) => e.email === email);

    const isVerified = emailExists?.isVerified;

    if (emailExists && isVerified) {
      throw new HttpError({
        message: 'Email was already verified.',
        status: STATUS_CODES.UNPROCESSABLE_ENTITY,
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
        status: STATUS_CODES.UNAUTHORIZED,
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
    throw error;
  }
}
