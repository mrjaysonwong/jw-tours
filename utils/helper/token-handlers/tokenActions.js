import Token from '@/model/tokenModel/tokenModel';
import { generateOTP } from './generateOTP';
import { generateToken } from './generateToken';
import jwt from 'jsonwebtoken';
import { formattedDate } from '../formats/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/src/template/EmailTemplate';

async function updateEmailOTP(userId, email) {
  const foundTokenEmail = await Token.findOne({ 'email.email': email });

  // Insert from nested array
  if (!foundTokenEmail) {
    const { otp, expires } = generateOTP();

    await Token.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          email: {
            email: email,
            token: otp,
            expireTimestamp: expires,
          },
        },
      },

      { new: true }
    );

    return { otp, expires };
  } else {
    // Update existing nested email from matched query email
    const { otp, expires } = generateOTP();

    await Token.findOneAndUpdate(
      {
        'email.email': email,
      },
      {
        $set: {
          'email.$.token': otp,
          'email.$.expireTimestamp': expires,
        },
        $inc: {
          'email.$.requestCount': 1,
        },
      },
      { new: true }
    );

    return { otp, expires };
  }
}

async function updateMobileOTP(userId, dialCode, phoneNumber) {
  const foundTokenNumber = await Token.findOne({
    'phone.dialCode': dialCode,
    'phone.phoneNumber': phoneNumber,
  });

  // Insert from nested array
  if (!foundTokenNumber) {
    const { otp, expires } = generateOTP();

    await Token.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          phone: {
            dialCode: dialCode,
            phoneNumber: phoneNumber,
            token: otp,
            expireTimestamp: expires,
          },
        },
      },

      { new: true }
    );

    return { otp, expires };
  } else {
    // Update existing nested phone from matched query phoneNumber
    const { otp, expires } = generateOTP();

    await Token.findOneAndUpdate(
      {
        'phone.phoneNumber': phoneNumber,
      },
      {
        $set: {
          'phone.$.token': otp,
          'phone.$.expireTimestamp': expires,
        },
        $inc: {
          'phone.$.requestCount': 1,
        },
      },
      { new: true }
    );

    return { otp, expires };
  }
}


// Error creating OTP: TypeError: Cannot read properties of undefined (reading 'replace')
// try simplify helpers

export async function createOTP(userId, email, dialCode, phoneNumber) {
  try {
    if (email) {
      const { otp, expires } = generateOTP();
      await Token.create({
        userId,
        email: [
          {
            email: email,
            token: otp,
            expireTimestamp: expires,
          },
        ],
      });

      return { otp, expires };
    } else {
      const { otp, expires } = generateOTP();
      await Token.create({
        userId,
        phone: [
          {
            dialCode: dialCode,
            phoneNumber: phoneNumber,
            token: otp,
            expireTimestamp: expires,
          },
        ],
      });

      return { otp, expires };
    }
  } catch (error) {
    console.error('Error creating OTP:', error);
    throw new Error('Failed to create OTP');
  }
}

export async function updateOTP(userId, email, dialCode, phoneNumber) {
  if (email) {
    const { otp, expires } = await updateEmailOTP(userId, email);

    return { otp, expires };
  } else {
    const { otp, expires } = await updateMobileOTP(
      userId,
      dialCode,
      phoneNumber
    );
    return { otp, expires };
  }
}


export function authEmailToken(email, Request, action) {
  // Generate and Authenticate Email Token
  const token = generateToken(email);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  Request.user = decoded;

  const { exp: expires } = Request.user;

  const epochTime = expires * 1000; // convert to milliseconds
  const formattedDateString = formattedDate(epochTime);
  const encodedEmail = encodeURIComponent(email);

  const paramsAction = action === 'signin' ? 'signin' : 'signup';

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
  const url = `${baseUrl}/verify?token=${token}&email=${encodedEmail}&action=${paramsAction}`;

  const emailHtml = render(
    <EmailTemplate
      url={url}
      formattedDateString={formattedDateString}
      action={action}
    />
  );

  return { token, epochTime, emailHtml };
}

export async function cleanTokenRequests() {
  const currentTimestamp = Date.now();

  // Update documents to pull expired email and phone fields
  await Token.updateMany(
    {
      $or: [
        { 'email.expireTimestamp': { $lte: currentTimestamp } },
        { 'phone.expireTimestamp': { $lte: currentTimestamp } },
      ],
    },
    {
      $pull: {
        email: { expireTimestamp: { $lte: currentTimestamp } },
        phone: { expireTimestamp: { $lte: currentTimestamp } },
      },
    }
  );

  // Delete documents by condition
  await Token.deleteMany({
    $or: [
      // Case 1: Both `email` and `phone` fields exist and are empty arrays
      {
        email: { $exists: true, $size: 0 },
        phone: { $exists: true, $size: 0 },
      },

      // Case 2: `email` field does not exist, and `phone` field exists and is an empty array
      {
        email: { $exists: false },
        phone: { $exists: true, $size: 0 },
      },

      // Case 3: `phone` field does not exist, and `email` field exists and is an empty array
      {
        phone: { $exists: false },
        email: { $exists: true, $size: 0 },
      },
    ],
  });
}
