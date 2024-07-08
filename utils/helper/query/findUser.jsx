import connectMongo from '@/lib/connection';
import User from '@/model/userModel';
import Token from '@/model/tokenModel';

export async function findUser(email) {
  try {
    await connectMongo();

    const userExists = await User.findOne({
      'email.email': email,
    });

    if (!userExists) {
      return null;
    }

    const { _id: id, role, email: userEmail } = userExists;

    const userObj = {
      id,
      userEmail,
      role,
    };

    return userObj;
  } catch (error) {
    throw error.message;
  }
}

export async function findTokenUser(email) {
  try {
    await connectMongo();

    const userExists = await Token.findOne({
      'email.email': email,
    });

    if (!userExists) {
      return null;
    }

    const user = userExists.email.find((e) => e.email === email);

    return user;
  } catch (error) {
    throw error.message;
  }
}
