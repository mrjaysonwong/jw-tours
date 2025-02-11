import Token from '@/models/tokenModel';

async function updateEmailToken(userId, email, token, expireTimestamp) {
  // Use field.$ positional operator to update the targeted email in array object
  await Token.updateOne(
    { userId, 'email.email': email },
    {
      $set: {
        'email.$': {
          email,
          token,
          expireTimestamp,
        },
      },
    }
  );
}

async function addEmailToken(userId, email, token, expireTimestamp) {
  // Add a new email object in array
  await Token.updateOne(
    { userId },
    {
      $addToSet: {
        email: {
          email,
          token,
          expireTimestamp,
        },
      },
    }
  );
}

async function createEmailToken(userId, email, token, expireTimestamp) {
  // Create a new user token document
  await Token.create({
    userId,
    email: [
      {
        email,
        token,
        expireTimestamp,
      },
    ],
  });
}

export async function manageUserEmailToken(
  userId,
  email,
  token,
  expireTimestamp
) {
  const userTokenExists = await Token.findOne({ userId });

  if (userTokenExists) {
    const targetEmail = userTokenExists.email.find((e) => e.email === email);

    const updateAction = targetEmail
      ? updateEmailToken(userId, email, token, expireTimestamp)
      : addEmailToken(userId, email, token, expireTimestamp);

    await updateAction;
  } else {
    await createEmailToken(userId, email, token, expireTimestamp);
  }

  return userTokenExists;
}
