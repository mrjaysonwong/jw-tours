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

async function saveNewUser(data, token, expireTimestamp) {

  console.log('➡️ saveNewUser input:', {
    firstName: data.firstName,
    lastName: data.lastName,
    password: data.password,
  });


  const hashedPassword = await hash(data.password, 12);

  const newUser = await User.create({
    firstName: data.firstName,
    lastName: data.lastName,
    email: [
      {
        email: data.email,
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
        email: data.email,
        token,
        expireTimestamp,
      },
    ],
  });
}

export async function registerUser(data) {
  try {
    const userEmailExists = await findUserEmail({ email: data.email });

    if (userEmailExists) {
      throw new HttpError({
        message: 'This email is already in use. Please choose another.',
        status: STATUS_CODES.CONFLICT,
      });
    }

    const { token, expireTimestamp, emailHtml } = generateEmailVerificationData({
      email: data.email,
      actionType: ACTIONS.SIGNUP,
      firstName: data.firstName,
      callbackUrl: '', 
    });

    console.log('✅ Email verification data:', { token, expireTimestamp });

    await saveNewUser(data, token, expireTimestamp);
    console.log('✅ User and token saved');


    // Send the email content
    await sendEmail({
      to: data.email,
      subject: 'Verify your JW Tours account',
      html: emailHtml,
    });

    console.log('✅ Email sent');

  } catch (error) {
    throw error;
  }
}
