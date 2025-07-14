// internal imports
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import Token from '@/models/tokenModel';
import User from '@/models/userModel';

export async function verifyAndAddMobile(
  otp,
  phone,
  userId,
  userExists,
  isFirebaseAuthOk
) {
  try {
    const { dialCode, phoneNumber } = phone;

    const phoneNumberExists = userExists?.phone?.find(
      (e) => e.dialCode === dialCode && e.phoneNumber === phoneNumber
    );

    const isVerified = phoneNumberExists?.isVerified;

    if (phoneNumberExists && isVerified) {
      throw new HttpError({
        message: 'Mobile number was already verified.',
        status: STATUS_CODES.UNPROCESSABLE_ENTITY,
      });
    }

    /* discontinue, currently using firebase otp */
    // const foundToken = await Token.findOne({
    //   userId,
    //   phone: {
    //     $elemMatch: {
    //       dialCode,
    //       phoneNumber,
    //       token: otp,
    //     },
    //   },
    // }).select('userId phone.$');

    // const currentTimestamp = Date.now(); // epochTime
    // const expireTimestamp = foundToken?.phone[0].expireTimestamp;

    // if (!foundToken || expireTimestamp <= currentTimestamp) {
    //   throw new HttpError({
    //     message: 'Invalid or expired OTP',
    //     status: STATUS_CODES.UNAUTHORIZED,
    //   });
    // }

    if (isFirebaseAuthOk) {
      const initialPhone = !userExists.phone || userExists.phone.length < 1;

      await User.updateOne(
        { _id: userId },
        {
          $addToSet: {
            phone: {
              dialCode,
              phoneNumber,
              isPrimary: initialPhone ? true : false,
              isVerified: true,
            },
          },
        }
      );
    }
  } catch (error) {
    throw error;
  }
}
