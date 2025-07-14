// third-party imports
import { compare } from 'bcryptjs';

// internal imports
import connectMongo from '@/libs/connectMongo';
import { findUser, findUserVerifiedEmail } from '../users/userQueries';
import User from '@/models/userModel';
import Token from '@/models/tokenModel';
import { ACTIONS, ROLES } from '@/constants/common';

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
  // Connect to database
  await connectMongo();
  const userExists = await findUser({ email, password });

  if (!userExists) {
    throw new Error('Invalid Credentials');
  }

  const isAdmin = userExists.role === ROLES.ADMIN;
  const passwordLess = userExists.password === '';
  const isSuspended = userExists.status === 'suspended';

  const primaryEmail = userExists.email.find((e) => e.isPrimary === true);
  const isPrimaryEmail = primaryEmail?.email === email; // Ensure primaryEmail exists
  const isVerified = await findUserVerifiedEmail(email);

  // 1. Check if the user is trying to access the admin panel but is not an admin
  if (pathname.startsWith('/admin') && !isAdmin) {
    throw new Error('This account is not allowed to sign in as Administrator.');
  }

  // 2. Check if the user's email is verified
  if (!isVerified) {
    throw new Error(
      'Email must be verified. Please check your inbox for the verification email.'
    );
  }

  // 3. Check if the account is password-less and enforce proper authentication method
  if (passwordLess) {
    if (isPrimaryEmail) {
      throw new Error(
        `Please use the ${userExists.accountProvider} sign-in method.`
      );
    }
    throw new Error('Invalid Credentials');
  }

  // 4. Check if the account is suspended
  if (isSuspended) {
    throw new Error('Your account has been suspended. Please contact support.');
  }

  // 5. Validate the password
  const passwordsMatch = await compare(password, userExists.password);
  if (!passwordsMatch) {
    throw new Error('Invalid Credentials');
  }

  // 6. Update account provider and return user object
  await User.updateOne(
    { 'email.email': email },
    { $set: { accountProvider: 'credentials' } }
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
  const verifiedOnce = getEmail.requestCount > 1;

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

  if (action === ACTIONS.SIGNIN) {
    await User.updateOne(
      { 'email.email': email },
      {
        $set: {
          accountProvider: 'email',
        },
      }
    );

    await incrementRequestCount();
  } else if (action === ACTIONS.SIGNUP) {
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

  const isSuspended = userExists.status === 'suspended';

  if (isSuspended) {
    throw new Error('Your account has been suspended. Please contact support.');
  }

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
