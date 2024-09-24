import Token from '@/models/tokenModel/tokenModel';
import { generateOTP } from './generateOTP';
import { generateToken } from './generateToken';
import jwt from 'jsonwebtoken';
import { formattedDate } from '../../utils/formats/formattedDate';
import { render } from '@react-email/render';
import { EmailTemplate } from '@/templates/EmailTemplate';
import {
  findTokenEmail,
  findTokenPhoneNumber,
} from '@/helpers/query/Token';

async function updateEmailOTP(userId, email) {
  const tokenEmailExists = await findTokenEmail(userId, email);

  // Insert from nested array
  if (!tokenEmailExists) {
    const { otp, expires } = generateOTP();

    await Token.updateOne(
      { userId },
      {
        $addToSet: {
          email: {
            email,
            token: otp,
            expireTimestamp: expires,
          },
        },
      }
    );

    return { otp, expires };
  } else {
    // Update existing nested email from matched query email
    const { otp, expires } = generateOTP();

    await Token.updateOne(
      {
        userId,
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
      }
    );

    return { otp, expires };
  }
}

async function updateMobileOTP(userId, dialCode, phoneNumber) {
  const tokenPhoneExists = await findTokenPhoneNumber(
    userId,
    dialCode,
    phoneNumber
  );

  // Insert from nested array
  if (!tokenPhoneExists) {
    const { otp, expires } = generateOTP();

    await Token.updateOne(
      { userId },
      {
        $addToSet: {
          phone: {
            dialCode,
            phoneNumber,
            token: otp,
            expireTimestamp: expires,
          },
        },
      }
    );

    return { otp, expires };
  } else {
    // Update existing nested phone from matched query phoneNumber
    const { otp, expires } = generateOTP();

    await Token.updateOne(
      {
        userId,
        'phone.dialCode': dialCode,
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
      }
    );

    return { otp, expires };
  }
}

export async function createOTP(userId, email, dialCode, phoneNumber) {
  try {
    if (email) {
      const { otp, expires } = generateOTP();

      await Token.create({
        userId,
        email: [
          {
            email,
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
            dialCode,
            phoneNumber,
            token: otp,
            expireTimestamp: expires,
          },
        ],
      });

      return { otp, expires };
    }
  } catch (error) {
    console.error('Error while creating OTP:', error.message);
    throw error;
  }
}

export async function updateOTP(userId, email, dialCode, phoneNumber) {
  try {
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
  } catch (error) {
    console.error('Error while updating OTP:', error.message);
    throw error;
  }
}

export async function handleUserTokenOTP({
  userId,
  email,
  dialCode,
  phoneNumber,
}) {
  try {
    let otp;
    let epochTimeExpires;
    let statusCode;

    const foundUserToken = await Token.findOne({ userId });

    if (!foundUserToken) {
      const { otp: genOTP, expires: genExpires } = await createOTP(
        userId,
        email,
        dialCode,
        phoneNumber
      );

      otp = genOTP;
      epochTimeExpires = genExpires;
      statusCode = 201;
    } else {
      const { otp: genOTP, expires: genExpires } = await updateOTP(
        userId,
        email,
        dialCode,
        phoneNumber
      );

      otp = genOTP;
      epochTimeExpires = genExpires;
      statusCode = 200;
    }

    return { otp, epochTimeExpires, statusCode };
  } catch (error) {
    console.error('Error in handleUserToken:', error.message);
    throw error;
  }
}

export function authEmailToken({ email, Request, action, firstName }) {
  // Generate and Authenticate Email Token
  const token = generateToken(email);
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  Request.user = decoded;

  const { exp: expires } = Request.user;

  const epochTime = expires * 1000; // convert to milliseconds
  const formattedDateString = formattedDate(epochTime);
  const encodedEmail = encodeURIComponent(email);

  let paramsAction;

  switch (action) {
    case 'signin':
      paramsAction = 'signin';
      break;
    case 'forgot-password':
      paramsAction = 'reset-password';
      break;
    default:
      paramsAction = 'signup';
  }

  const baseUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;

  const url =
    action === 'forgot-password'
      ? `${baseUrl}/account/reset-password?token=${token}`
      : `${baseUrl}/verify?token=${token}&email=${encodedEmail}&action=${paramsAction}`;

  const emailHtml = render(
    <EmailTemplate
      url={url}
      formattedDateString={formattedDateString}
      action={action}
      firstName={firstName}
    />
  );

  return { token, epochTime, emailHtml };
}

export async function handleUserTokenLink(
  userId,
  email,
  token,
  expireTimestamp
) {
  const userTokenExists = await Token.findOne({ userId });

  const targetEmail = userTokenExists?.email.find((e) => e.email === email);

  if (userTokenExists) {
    if (targetEmail) {
      // Use field.$ positional operator to update the targeted email array object
      await Token.updateOne(
        { userId, 'email.email': email },
        {
          $set: {
            'email.$': {
              email,
              token,
              expireTimestamp,
            },
          },
        }
      );
    } else {
      // Add a new email object
      await Token.updateOne(
        { userId },
        {
          $addToSet: {
            email: {
              email,
              token,
              expireTimestamp,
            },
          },
        }
      );
    }
  } else {
    // Create a new document
    await Token.create({
      userId,
      email: [
        {
          email,
          token,
          expireTimestamp,
        },
      ],
    });
  }

  return userTokenExists;
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
