import connectMongo from '@/lib/connection';
import User from '@/model/userModel/userModel';
import Token from '@/model/tokenModel/tokenModel';
import { compare } from 'bcryptjs';
import {
  findUserByEmail,
  findUserVerifiedEmail,
  constructUserObject,
} from './query/User';

export async function authSignInCredentials(credentials, req) {
  try {
    const { email, password } = credentials;

    await connectMongo();

    const userExists = await findUserByEmail(email);

    if (!userExists) {
      throw new Error('Invalid Credentials');
    }

    const passwordLess = userExists.password === '';
    const primaryEmail = userExists.email.find((e) => e.isPrimary === true);
    const isPrimaryEmail = primaryEmail.email === credentials.email;

    const isVerified = await findUserVerifiedEmail(email);

    if (!isVerified) {
      throw new Error('Verify Email First');
    } else if (passwordLess && isPrimaryEmail) {
      throw new Error(
        `Please use the ${userExists.accountProvider} sign-in method`
      );
    } else if (passwordLess && !isPrimaryEmail) {
      throw new Error('Invalid Credentials');
    }

    const passwordsMatch = await compare(password, userExists.password);

    if (!passwordsMatch) {
      throw new Error('Invalid Credentials');
    }

    await User.updateOne(
      { 'email.email': email },
      {
        $set: {
          accountProvider: 'credentials',
        },
      }
    );

    const user = constructUserObject(userExists);

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

export async function authSignInEmail(credentials) {
  try {
    const { token, email, action } = credentials;

    await connectMongo();

    const userExists = await findUserByEmail(email);

    if (!userExists) {
      throw new Error('Email must be verified.');
    }

    const userTokenExists = await Token.aggregate([
      { $unwind: '$email' },
      { $match: { 'email.email': email, 'email.token': token } },
      { $project: { _id: 0, email: 1 } },
    ]);

    const verifiedOnce = userTokenExists[0]?.email?.requestCount >= 2;

    if (userTokenExists.length === 0 || verifiedOnce) {
      throw new Error('Invalid or expired sign-in link.');
    }

    if (action === 'signin') {
      await User.updateOne(
        { 'email.email': email },
        {
          $set: {
            accountProvider: 'email',
          },
        }
      );

      // Increment count + 1
      await Token.updateOne(
        { 'email.email': email },
        {
          $inc: { 'email.$.requestCount': 1 },
        }
      );
    } else if (action === 'signup') {
      // Set isVerified to true for the newly signed-up user
      await User.updateOne(
        { 'email.email': email },
        {
          $set: {
            'email.$.isVerified': true,
          },
        }
      );

      await Token.updateOne(
        { 'email.email': email },
        {
          $inc: { 'email.$.requestCount': 1 },
        }
      );
    }

    const user = constructUserObject(userExists);

    return user;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function authSignInOAuth(user, account) {
  try {
    const [firstName, lastName] = user?.name.split(' ');

    await connectMongo();

    const userExists = await User.findOne({ 'email.email': user.email });

    if (!userExists) {
      await User.create({
        firstName,
        lastName: lastName ?? '',
        email: [
          {
            email: user.email,
            isPrimary: true,
            isVerified: true,
          },
        ],
        password: '',
        image: {
          url: user.image,
        },
        accountProvider: account.provider,
      });
    } else {
      await User.updateOne(
        { 'email.email': user.email },
        {
          $set: {
            firstName: userExists.firstName,
            lastName: userExists.lastName,
            'email.$.isVerified': true,
            image: {
              public_id: userExists.image.public_id,
              url: userExists.image.url,
            },
            accountProvider: account.provider,
          },
        }
      );
    }
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
}
