// third-party imports
import { hash } from 'bcryptjs';

// internal imports
import { findUserEmail } from './userQueries';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES, ACTIONS } from '@/constants/common';
import { generateEmailVerificationData } from '../auth/generateEmailVerificationData';
import User from '@/models/userModel';
import Token from '@/models/tokenModel';
import { sendEmail } from '@/services/email/sendEmail';

async function saveNewUser(formData, token, epochTime) {
  const hashedPassword = await hash(formData.password, 12);

  const newUser = await User.create({
    firstName: formData.firstName,
    lastName: formData.lastName,
    email: [
      {
        email: formData.email,
        isPrimary: true,
        isVerified: false,
      },
    ],
    password: hashedPassword,
  });

  await Token.create({
    userId: newUser._id,
    email: [
      {
        email: formData.email,
        token,
        expireTimestamp: epochTime,
      },
    ],
  });
}

export async function registerUser(formData) {
  try {
    const userEmailExists = await findUserEmail({ email: formData.email });

    if (userEmailExists) {
      throw new HttpError({
        message: 'This email is already in use. Please choose another.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    const { token, epochTime, emailHtml } = generateEmailVerificationData({
      email: formData.email,
      Request,
      actionType: ACTIONS.SIGNUP,
    });

    await saveNewUser(formData, token, epochTime);

    // Send the email content
    await sendEmail({
      to: formData.email,
      subject: 'Verify your JW Tours account',
      html: emailHtml,
    });
  } catch (error) {
    throw error;
  }
}
