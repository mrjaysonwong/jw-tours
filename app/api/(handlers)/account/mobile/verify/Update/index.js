import User from '@/models/userModel/userModel';
import Token from '@/models/tokenModel/tokenModel';
import { HttpError } from '@/helpers/errorHelpers';
import { getLocalMessage } from '@/helpers/errorHelpers';

export async function verifyAndAddMobile(Request, userId) {
  const searchParams = Request.nextUrl.searchParams;
  const dialCode = searchParams.get('dialcode');
  const phoneNumber = searchParams.get('number');

  try {
    if (!dialCode || !phoneNumber) {
      throw new HttpError({
        message: getLocalMessage('Invalid or missing parameters'),
        status: 400,
      });
    }

    const userExists = await User.findById(userId).select('phone');

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
      });
    }

    const { otp } = await Request.json();

    if (!otp) {
      throw new HttpError({
        message: 'Input the OTP.',
        status: 400,
      });
    }

    const phoneNumberExists = await User.findOne({
      _id: userId,
      phone: {
        $elemMatch: {
          dialCode: `+${dialCode}`,
          phoneNumber,
          isVerified: true,
        },
      },
    }).select('phone.$');

    if (phoneNumberExists) {
      throw new HttpError({
        message: 'Mobile number was already verified.',
        status: 422,
      });
    }

    const foundToken = await Token.findOne({
      userId,
      phone: {
        $elemMatch: {
          dialCode: `+${dialCode}`,
          phoneNumber,
          token: otp,
        },
      },
    }).select('userId phone.$');

    const currentTimestamp = Date.now(); // epochTime
    const expireTimestamp = foundToken?.phone[0].expireTimestamp;

    if (!foundToken || expireTimestamp <= currentTimestamp) {
      throw new HttpError({
        message: 'Invalid or expired OTP',
        status: 401,
      });
    }

    const initialPhone = !userExists.phone;

    await User.updateOne(
      { _id: userId },
      {
        $addToSet: {
          phone: {
            dialCode: `+${dialCode}`,
            phoneNumber,
            isPrimary: initialPhone ? true : false,
            isVerified: true,
          },
        },
      }
    );
  } catch (error) {
    console.error('Error while verifying mobile OTP.', error.message);
    throw error;
  }
}
