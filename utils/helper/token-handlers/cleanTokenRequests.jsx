import Token from '@/model/tokenModel';

export async function cleanTokenRequests() {
  const currentTimestamp = Date.now();

  await Token.updateMany(
    {
      'email.expireTimestamp': { $lte: currentTimestamp },
    },
    {
      $pull: {
        email: { expireTimestamp: { $lte: currentTimestamp } },
      },
    }
  );

  // delete document if email field exists and array length/size is 0
  await Token.deleteMany({ email: { $exists: true, $size: 0 } });
}
