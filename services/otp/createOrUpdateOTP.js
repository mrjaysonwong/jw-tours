// internal imports
import {
  findTokenEmailWithId,
  findTokenPhoneNumberWithId,
} from '@/services/token/tokenQueries';
import { generateOTP } from '@/services/otp/generateOTP';
import Token from '@/models/tokenModel';

async function updateEmailOTP(userId, email) {
  const tokenEmailExists = await findTokenEmailWithId({ userId, email });

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
        email: {
          $elemMatch: {
            email,
          },
        },
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
  const tokenPhoneExists = await findTokenPhoneNumberWithId({
    userId,
    dialCode,
    phoneNumber,
  });

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
        phone: {
          $elemMatch: {
            dialCode,
            phoneNumber,
          },
        },
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

async function createOTP(userId, email, dialCode, phoneNumber) {
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
    throw error;
  }
}

async function updateOTP(userId, email, dialCode, phoneNumber) {
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
    throw error;
  }
}

export async function createOrUpdateOTP({
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
    throw error;
  }
}
