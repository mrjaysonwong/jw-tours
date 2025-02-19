// third-party imports
import { hash } from 'bcryptjs';

// internal imports
import Token from '@/models/tokenModel';
import User from '@/models/userModel';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/api';

export async function setNewPassword(formData, authToken) {
  try {
    const tokenExists = await Token.findOne({
      'email.token': authToken,
    }).select('userId email.$');

    if (!tokenExists) {
      throw new HttpError({
        message: 'Invalid token or has expired. Please request a new link.',
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const hashpassword = await hash(formData.password, 12);

    await User.updateOne(
      { _id: tokenExists.userId },
      {
        $set: { password: hashpassword },
      }
    );

    await Token.updateOne(
      { 'email.token': authToken },
      {
        $inc: { 'email.$.requestCount': 1 },
      }
    );

    return authToken;
  } catch (error) {
    throw error;
  }
}
