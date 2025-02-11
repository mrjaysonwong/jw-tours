// third-party imports
import { compare } from 'bcryptjs';

// internal imports
import connectMongo from '@/services/db/connectMongo';
import { findUser, findUserVerifiedEmail } from '../user/userQueries';
import User from '@/models/userModel';
import Token from '@/models/tokenModel';
import { ACTION_TYPES, ROLES } from '@/constants/api';

export function constructUserObject({
  _id,
  email,
  firstName,
  lastName,
  role,
  image,
  langCode,
}) {
  const primaryEmail = email.find((e) => e.isPrimary === true);

  const name = `${firstName} ${lastName}`;

  return {
    id: _id.toHexString(),
    name,
    email: primaryEmail.email,
    image: image.url,
    role,
    langCode,
  };
}

async function handleSignInCredentials(email, password, pathname) {
  // connect to database
  await connectMongo();
  const userExists = await findUser({ email, password });

  if (!userExists) {
    throw new Error('Invalid Credentials');
  }

  const isAdmin = userExists.role === ROLES.ADMIN;
  const passwordLess = userExists.password === '';

  const primaryEmail = userExists.email.find((e) => e.isPrimary === true);
  const isPrimaryEmail = primaryEmail.email === email;
  const isVerified = await findUserVerifiedEmail(email);

  if (pathname.startsWith('/admin') && !isAdmin) {
    throw new Error('This account is not allowed to sign in as Administrator.');
  }

  if (!isVerified) {
    throw new Error(
      'Email must be verified. Please check your inbox for the verification email.'
    );
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

  return constructUserObject(userExists);
}

async function handleSignInEmail(email, token, action) {
  // connect to database
  await connectMongo();
  const userExists = await findUser({ email });

  const userTokenExists = await Token.findOne({
    email: {
      $elemMatch: {
        email,
        token,
      },
    },
  }).select('email.$');

  if (!userExists || !userTokenExists) {
    throw new Error('Invalid or expired sign-in link.');
  }

 

  const getEmail = userTokenExists.email.find((e) => e.email === email);
  const verifiedOnce = getEmail.requestCount >= 1;

  if (verifiedOnce) {
    throw new Error('Invalid or expired sign-in link.');
  }

  const incrementRequestCount = async () => {
    // Increment count + 1
    await Token.updateOne(
      { 'email.email': email },
      {
        $inc: { 'email.$.requestCount': 1 },
      }
    );
  };

  if (action === ACTION_TYPES.SIGNIN) {
    await User.updateOne(
      { 'email.email': email },
      {
        $set: {
          accountProvider: 'email',
        },
      }
    );

    await incrementRequestCount();
  } else if (action === ACTION_TYPES.SIGNUP) {
    // Set isVerified to true for the newly signed-up user
    await User.updateOne(
      { 'email.email': email },
      {
        $set: {
          'email.$.isVerified': true,
          status: 'active',
        },
      }
    );

    await incrementRequestCount();
  }

  return constructUserObject(userExists);
}

async function handleSignInOAuth(user, account) {
  // connect to database
  await connectMongo();
  const userExists = await findUser({ email: user.email });

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
      status: 'active',
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
}

export async function authSignInCredentials({ email, password, pathname }) {
  try {
    const user = await handleSignInCredentials(email, password, pathname);

    return user;
  } catch (error) {
    console.error('Failed to signin with Credentials:', error);
    throw error;
  }
}

export async function authSignInEmail({ token, email, action }) {
  try {
    const user = await handleSignInEmail(email, token, action);

    return user;
  } catch (error) {
    console.error('Failed to signin with Email:', error);
    throw error;
  }
}

export async function authSignInOAuth(user, account) {
  try {
    await handleSignInOAuth(user, account);
  } catch (error) {
    console.error('Failed to signin with OAuth:', error);
    throw error;
  }
}
