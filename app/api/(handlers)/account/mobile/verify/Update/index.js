import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { findUserById } from '@/utils/helper/query/User';
import { HttpError } from '@/utils/helper/errorHandler';
import { getLocalMessage } from '@/utils/helper/errorHandler';

export async function verifyMobileOTP(Request, userId) {
  try {
    const searchParams = Request.nextUrl.searchParams;
    const dialCode = searchParams.get('dialcode');
    const phoneNumber = searchParams.get('number');

    if (!dialCode || !phoneNumber) {
      throw new HttpError({
        message: getLocalMessage('Invalid or missing parameters'),
        status: 400,
      });
    }

    const userExists = await findUserById(userId);

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
      });
    }

    const { otp } = await Request.json();

    const phoneNumberExists = await User.findOne({
      _id: userId,
      phone: {
        $elemMatch: {
          dialCode: `+${dialCode}`,
          phoneNumber: phoneNumber,
          isVerified: true,
        },
      },
    });

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
          phoneNumber: phoneNumber,
          token: otp,
        },
      },
    });

    const currentTimestamp = Date.now(); // epochTime
    const expireTimestamp = foundToken?.phone[0].expireTimestamp;

    if (!foundToken || expireTimestamp <= currentTimestamp) {
      throw new HttpError({
        message: 'Invalid or expired OTP',
        status: 401,
      });
    }

    const initialPhone = !userExists.phone;

    await User.findByIdAndUpdate(
      userId,
      {
        $addToSet: {
          phone: {
            dialCode: `+${dialCode}`,
            phoneNumber: phoneNumber,
            isPrimary: initialPhone ? true : false,
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
