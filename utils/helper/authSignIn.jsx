import connectMongo from '@/lib/connection';
import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import { compare } from 'bcryptjs';

export async function authSignInCredentials(credentials, req) {
  const { email, password } = credentials;

  try {
    await connectMongo();

    const userExists = await User.findOne({
      'email.email': email,
    });

    if (!userExists) {
      throw new Error('Invalid Credentials');
    }

    const isVerified = await User.findOne({
      'email.email': email,
      'email.isVerified': true,
    });

    if (!isVerified) {
      throw new Error('Verify Email First');
    } else if (userExists.password === '') {
      throw new Error(
        `Please use the ${userExists.accountProvider} sign-in method`
      );
    }

    const passwordsMatch = await compare(password, userExists.password);

    if (!passwordsMatch) {
      throw new Error('Invalid Credentials');
    }

    await User.findOneAndUpdate(
      { 'email.email': email },
      {
        $set: {
          accountProvider: 'credentials',
        },
      },
      { new: true }
    );

    const { firstName, lastName, role, image, _id } = userExists;
    const foundPrimaryEmail = userExists.email.find(
      (e) => e.isPrimary === true
    );
    const name = `${firstName} ${lastName}`;

    const user = {
      email: foundPrimaryEmail.email,
      name,
      role,
      image: image.url,
      id: _id,
    };

    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error(error.message);
  }
}

export async function authSignInEmail(credentials) {
  const { token, email, mode } = credentials;

  try {
    await connectMongo();

    const userExists = await User.findOne({
      'email.email': email,
    });

    if (!userExists) {
      throw new Error('User Not Found');
    }

    const tokenUserExists = await Token.findOne({
      'email.email': email,
      'email.token': token,
    });

    if (!tokenUserExists) {
      throw new Error('Invalid sign in link');
    }

    if (mode === 'signin') {
      await User.findOneAndUpdate(
        { 'email.email': email },
        {
          $set: {
            accountProvider: 'email',
          },
        },
        { new: true }
      );
    } else if (mode === 'signup') {
      // Set isVerified to true for the newly signed-up user
      await User.findOneAndUpdate(
        { 'email.email': email },
        {
          $set: {
            'email.$.isVerified': true,
          },
        },
        {
          new: true,
        }
      );
    }

    const currentTimestamp = Date.now();

    // set expired once verified
    await Token.findOneAndUpdate(
      { 'email.email': email },
      {
        $set: {
          'email.$.expireTimestamp': currentTimestamp,
        },
      },
      { new: true }
    );

    const { firstName, lastName, role, image, _id } = userExists;
    const foundPrimaryEmail = userExists.email.find(
      (e) => e.isPrimary === true
    );
    const name = `${firstName} ${lastName}`;

    const userObj = {
      email: foundPrimaryEmail.email,
      name,
      role,
      image: image.url,
      id: _id,
    };

    return userObj;
  } catch (error) {
    console.error(error.message);
    throw new Error('Internal Server Error');
  }
}

export async function authSignInOAuth(user, account) {
  const [firstName, lastName] = user.name.split(' ');

  try {
    await connectMongo();

    const userExists = await User.findOne({ 'email.email': user.email });

    if (!userExists) {
      await User.create({
        id: user.id,
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
      await User.findOneAndUpdate(
        { 'email.email': user.email },
        {
          $set: {
            id: userExists._id,
            'email.$.isPrimary': true,
            'email.$.isVerified': true,
            image: {
              public_id: userExists.image.public_id,
              url: userExists.image.url,
            },
            accountProvider: account.provider,
          },
        },
        { new: true }
      );
    }
  } catch (error) {
    console.error(error.message);
    throw new Error('Internal Server Error');
  }
}
