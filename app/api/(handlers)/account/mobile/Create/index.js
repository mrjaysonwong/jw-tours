import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { getValidationError, HttpError } from '@/utils/helper/errorHandler';
import { phoneNumberSchema } from '@/lib/validation/yup/personalDetailsSchema';
import {
  createOTP,
  updateOTP,
} from '@/utils/helper/token-handlers/tokenActions';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import { sendSMS } from '@/utils/config/sendSMS';
import { findUserById } from '@/utils/helper/query/User';
import { handleRateLimitError } from '@/utils/helper/errorHandler';

const opts = {
  points: 1,
  duration: 60, // 60 secs per request
};

const rateLimiter = new RateLimiterMemory(opts);

export async function addMobileNumber(Request, userId) {
  try {
    const user = await findUserById(userId);

    if (user?.phone?.length >= 5) {
      throw new HttpError({
        message:
          'Cannot add more numbers; the maximum limit of mobile numbers has been reached.',
        status: 400,
      });
    }

    const body = await Request.json();

    const { dialCode, phoneNumber } = body.phone;
    const outbound = `${dialCode}${phoneNumber}`;

    await phoneNumberSchema.validate({ ...body }, { abortEarly: false });

    const phoneNumberTaken = await User.findOne({
      _id: userId,
      phone: {
        $elemMatch: {
          dialCode: dialCode,
          phoneNumber: phoneNumber,
        },
      },
    });

    if (phoneNumberTaken) {
      throw new HttpError({
        message: 'Phone number already taken.',
        status: 409,
      });
    }

    await rateLimiter.consume(outbound, 1);

    let otp;
    let epochTimeExpires;
    let statusCode;

    const foundUserToken = await Token.findOne({ userId });

    if (!foundUserToken) {
      const { otp: genOTP, expires: genExpires } = await createOTP(
        userId,
        undefined,
        dialCode,
        phoneNumber
      );

      otp = genOTP;
      epochTimeExpires = genExpires;
      statusCode = 201;
    } else {
      const { otp: genOTP, expires: genExpires } = await updateOTP(
        userId,
        undefined,
        dialCode,
        phoneNumber
      );

      otp = genOTP;
      epochTimeExpires = genExpires;
      statusCode = 200;
    }

    await sendSMS(outbound, otp);

    return { statusCode };
  } catch (error) {
    console.error(error);
    getValidationError(error);
    handleRateLimitError(error);

    throw error;
  }
}
