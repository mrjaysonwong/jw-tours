import Token from '@/model/tokenModel/tokenModel';

export async function findTokenByEmail(email) {
  return await Token.findOne({
    email: {
      $elemMatch: { email: email },
    },
  });
}

export async function findTokenRequestCount(email) {
  return await Token.findOne({
    email: {
      $elemMatch: { email: email, requestCount: 2 },
    },
  });
}

export async function findTokenById(userId) {
  return await Token.findById(userId);
}
