import User from '@/model/userModel/userModel';

export async function findUserByEmail(email) {
  return await User.findOne({ 'email.email': email });
}

export async function findUserVerifiedEmail(email) {
  return await User.findOne({
    email: {
      $elemMatch: { email: email, isVerified: true },
    },
  });
}

export async function findUserById(userId) {
  return await User.findById(userId);
}

export async function isUserEmailVerified(email) {
  return await User.aggregate([
    { $unwind: '$email' },
    { $match: { 'email.email': email, 'email.isVerified': true } },
    { $project: { _id: 0, email: 1 } },
  ]);
}

export function constructUserObject(user) {
  const { _id, firstName, lastName, role, image } = user;
  const primaryEmail = user.email.find((e) => e.isPrimary === true);
  const name = `${firstName} ${lastName}`;

  return {
    id: _id.toHexString(),
    name,
    email: primaryEmail.email,
    image: image.url,
    role,
  };
}
