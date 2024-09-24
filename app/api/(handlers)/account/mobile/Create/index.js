import User from '@/models/userModel/userModel';
import { getValidationError, HttpError } from '@/helpers/errorHelpers';
import { phoneNumberSchema } from '@/helpers/validation/yup/schemas/personalDetailsSchema';
import { rateLimiter } from '@/services/rateLimiter';
import { sendSMS } from '@/services/sendSMS';
import { handleRateLimitError } from '@/helpers/errorHelpers';
import { findUserPhoneNumber } from '@/helpers/query/User';
import { handleUserTokenOTP } from '@/helpers/token-handlers/tokenActions';

export async function sendMobileOTP(Request, userId) {
  try {
    const { phone } = await User.findById(userId).select('phone');

    if (phone?.length >= 5) {
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

    const phoneNumberTaken = await findUserPhoneNumber({
      userId,
      dialCode,
      phoneNumber,
    });

    if (phoneNumberTaken) {
      throw new HttpError({
        message: 'Phone number already taken.',
        status: 409,
      });
    }

    await rateLimiter.consume(outbound, 1);

    const { otp, statusCode } = await handleUserTokenOTP({
      userId,
      dialCode,
      phoneNumber,
    });

    await sendSMS({ outbound, otp });

    return { statusCode };
  } catch (error) {
    getValidationError(error);
    handleRateLimitError(error);

    throw error;
  }
}
