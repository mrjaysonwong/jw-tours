import connectMongo from '@/services/db/connectMongo';
import User from '@/models/userModel/userModel';
import Token from '@/models/tokenModel/tokenModel';
import { compare } from 'bcryptjs';
import { fetchUser, findUserVerifiedEmail } from './query/User';

export function constructUserObject({
  _id,
  email,
  firstName,
  lastName,
  role,
  image,
  languageCountry,
}) {
  const primaryEmail = email.find((e) => e.isPrimary === true);

  const name = `${firstName} ${lastName}`;

  return {
    id: _id.toHexString(),
    name,
    email: primaryEmail.email,
    image: image.url,
    role,
    lang: languageCountry,
  };
}

async function handleSignInCredentials(userExists, email, password) {
  const passwordLess = userExists.password === '';
  const primaryEmail = userExists.email.find((e) => e.isPrimary === true);
  const isPrimaryEmail = primaryEmail.email === email;

  const isVerified = await findUserVerifiedEmail({ email });

  if (!isVerified) {
    throw new Error('Email must be verified.');
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
}

async function handleSignInEmail(email, token, action) {
  const userTokenExists = await Token.findOne({
    'email.email': email,
    'email.token': token,
  }).select('email.$');

  if (!userTokenExists) {
    throw new Error('Invalid or expired sign-in link.');
  }

  const getEmail = userTokenExists?.email.find((e) => e.email === email);

  const verifiedOnce = getEmail.requestCount > 1;

  if (verifiedOnce) {
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
}

async function handleSignInOAuth(userExists, user, email, account) {
  const [firstName, lastName] = user?.name.split(' ');

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
      { 'email.email': email },
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
}

export async function authSignInCredentials(credentials, req) {
  try {
    const { email, password } = credentials;

    await connectMongo();

    const userExists = await fetchUser({ email, password });

    await handleSignInCredentials(userExists, email, password);

    const user = constructUserObject(userExists);

    return user;
  } catch (error) {
    console.error('Failed to signin with Credentials:', error);
    throw error;
  }
}

export async function authSignInEmail(credentials) {
  try {
    const { token, email, action } = credentials;

    await connectMongo();

    const userExists = await fetchUser({ email });

    await handleSignInEmail(email, token, action);

    const user = constructUserObject(userExists);

    return user;
  } catch (error) {
    console.error('Failed to signin with Email:', error);
    throw error;
  }
}

export async function authSignInOAuth(user, account) {
  try {
    const email = user.email;

    await connectMongo();

    const userExists = await fetchUser({ email });

    await handleSignInOAuth(userExists, user, email, account);
  } catch (error) {
    console.error('Failed to signin with OAuth:', error);
    throw new Error('Internal Server Error');
  }
}
