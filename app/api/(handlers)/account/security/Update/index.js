import { auth } from '@/auth';
import { headers } from 'next/headers';
import User from '@/models/userModel/userModel';
import Token from '@/models/tokenModel/tokenModel';
import { hash, compare } from 'bcryptjs';
import { HttpError } from '@/helpers/errorHelpers';
import {
  changePasswordSchema,
  newPasswordSchema,
} from '@/helpers/validation/yup/schemas/passwordSchema';
import { getValidationError } from '@/helpers/errorHelpers';

async function validateChangePassword(body, userPassword) {
  await changePasswordSchema.validate({ ...body }, { abortEarly: false });

  const passwordsMatch = await compare(body.currentPassword, userPassword);

  if (!passwordsMatch) {
    throw new HttpError({
      message: 'The current password you entered is incorrect.',
      status: 400,
    });
  }

  const isNewPasswordSameAsOld = await compare(body.newPassword, userPassword);

  if (isNewPasswordSameAsOld) {
    throw new HttpError({
      message: 'The new password cannot be the same as the current password.',
      status: 400,
    });
  }
}

async function validateSetNewPassword(body, token) {
  await newPasswordSchema.validate({ ...body }, { abortEarly: false });

  if (!token) {
    throw new HttpError({
      message: 'Missing token.',
      status: 400,
    });
  }

  const tokenExists = await Token.findOne({ 'email.token': token }).select(
    'userId email.$'
  );

  if (!tokenExists) {
    throw new HttpError({
      message: 'Invalid token or has expired. Please request a new link.',
      status: 400,
    });
  }

  if (tokenExists?.email[0].requestCount >= 1) {
    throw new HttpError({
      message: 'This token link has been already used.',
      status: 400,
    });
  }

  return tokenExists;
}

async function updateUserPassword(userId, hashedPassword) {
  await User.updateOne(
    { _id: userId },
    {
      $set: { password: hashedPassword },
    }
  );
}

async function updateTokenRequestCount(token) {
  await Token.updateOne(
    { 'email.token': token },
    {
      $inc: { 'email.$.requestCount': 1 },
    }
  );
}

export async function updatePassword(Request, action) {
  try {
    let userId;
    let hashedPassword;
    let token;

    if (action === 'change-password') {
      const session = await auth();

      if (!session) {
        throw new HttpError({
          message: 'Unauthorized! You must signin first.',
          status: 401,
        });
      }

      userId = session.user.id;

      const userExists = await User.findById(userId).select('password');

      if (!userExists) {
        throw new HttpError({
          message: 'User not found.',
          status: 404,
        });
      }

      const body = await Request.json();

      await validateChangePassword(body, userExists.password);

      hashedPassword = await hash(body.newPassword, 12);
    } else if (action === 'set-new-password') {
      const body = await Request.json();

      token = headers().get('authorization').replace('Bearer ', '');

      const tokenExists = await validateSetNewPassword(body, token);

      userId = tokenExists.userId;

      const userExists = await User.findById(userId).select('password');

      if (!userExists) {
        throw new HttpError({
          message: 'User not found.',
          status: 404,
        });
      }

      hashedPassword = await hash(body.password, 12);

      await updateTokenRequestCount(token);
    }

    await updateUserPassword(userId, hashedPassword);

    return { token };
  } catch (error) {
    console.error('Error while updating password.', error.message);
    getValidationError(error);
    throw error;
  }
}
