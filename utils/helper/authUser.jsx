import connectMongo from '@/lib/connection';
import User from '@/app/model/userModel';
import Token from '@/app/model/tokenModel';

export async function authSignin(credentials) {
  const { token, email, mode } = credentials;
  const isSignUp = mode === 'signup';

  try {
    await connectMongo();

    const userExists = await User.findOne({
      'email.email': email,
    });

    if (!userExists) {
      throw new Error('User Not Found');
    }

    const userTokenExists = await Token.findOne({
      'email.email': email,
      'email.token': token,
    });

    if (!userTokenExists) {
      throw new Error('Invalid sign in link');
    }

    if (isSignUp) {
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

    await Token.findOneAndUpdate(
      { 'email.email': email },
      {
        $set: {
          'email.$.expireTimestamp': currentTimestamp,
        },
      },
      { new: true }
    );

    const { firstName, lastName, image, id } = userExists;
    const foundEmail = userExists.email.find((e) => e.email === email);
    const name = `${firstName} ${lastName}`;

    const userObj = {
      email: foundEmail.email,
      name,
      image: image.url ?? null,
      id,
    };

    return userObj;
  } catch (error) {
    throw error.message;
  }
}
