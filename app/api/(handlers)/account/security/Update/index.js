import { auth } from '@/auth';
import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { hash, compare } from 'bcryptjs';
import { HttpError } from '@/utils/helper/errorHandler';
import {
  changePasswordSchema,
  newPasswordSchema,
} from '@/lib/validation/yup/passwordSchema';
import { getValidationError } from '@/utils/helper/errorHandler';

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

async function validateSetNewPassword(body) {
  await newPasswordSchema.validate({ ...body }, { abortEarly: false });

  if (!body.token) {
    throw new HttpError({
      message: 'Input token',
      status: 400,
    });
  }

  const tokenExists = await Token.findOne({ 'email.token': body.token });

  if (!tokenExists) {
    throw new HttpError({
      message: 'Invalid or token has expired. Please request a new link.',
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

async function updateTokenRequestCount(email) {
  await Token.updateOne(
    { 'email.email': email },
    {
      $inc: { 'email.$.requestCount': 1 },
    }
  );
}

export async function updatePassword(Request, action) {
  try {
    let userId;
    let email;
    let hashedPassword;

    if (action === 'change-password') {
      const session = await auth();

      if (!session) {
        throw new HttpError({
          message: 'Unauthorized! You must signin first.',
          status: 401,
        });
      }

      userId = session.user.id;
      email = session.user.email;

      const userExists = await User.findById(userId);

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
      const tokenExists = await validateSetNewPassword(body);

      userId = tokenExists.userId;
      email = tokenExists.email[0].email;

      const userExists = await User.findById(userId);

      if (!userExists) {
        throw new HttpError({
          message: 'User not found.',
          status: 404,
        });
      }

      hashedPassword = await hash(body.password, 12);
    }

    await updateUserPassword(userId, hashedPassword);
    await updateTokenRequestCount(email);
  } catch (error) {
    console.error(error);
    getValidationError(error);
    throw error;
  }
}
