import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import { generateOTP } from './generateOTP';

export async function createToken(userId, email) {
  const { otp: genOTP, expires: genExpires } = generateOTP();

  const createdToken = await Token.create({
    userId,
    email: [
      {
        email: email,
        token: genOTP,
        expireTimestamp: genExpires,
      },
    ],
  });

  return { genOTP, genExpires, token: createdToken };
}

export async function updateToken(foundUserToken, userId, email) {
  const foundEmail = foundUserToken.email.find((e) => e.email === email);

  if (!foundEmail) {
    const { otp: genOTP, expires: genExpires } = generateOTP();

    const updatedToken = await Token.findOneAndUpdate(
      { userId },
      {
        $addToSet: {
          email: {
            email: email,
            token: genOTP,
            expireTimestamp: genExpires,
          },
        },
      },

      { new: true }
    );

    return { genOTP, genExpires, token: updatedToken };
  } else {
    // updateCurrentEmailToken
    const { otp: genOTP, expires: genExpires } = generateOTP();

    const updatedToken = await Token.findOneAndUpdate(
      {
        'email.email': email,
      },
      {
        $set: {
          'email.$.token': genOTP,
          'email.$.expireTimestamp': genExpires,
        },
        $inc: {
          'email.$.requestCount': 1,
        },
      },
      { new: true }
    );

    return { genOTP, genExpires, token: updatedToken };
  }
}
