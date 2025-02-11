import Token from "@/models/tokenModel";

export async function cleanTokenRequests() {
    const currentTimestamp = Date.now();
  
    // Update documents to pull expired email and phone fields
    await Token.updateMany(
      {
        $or: [
          { 'email.expireTimestamp': { $lte: currentTimestamp } },
          { 'phone.expireTimestamp': { $lte: currentTimestamp } },
        ],
      },
      {
        $pull: {
          email: { expireTimestamp: { $lte: currentTimestamp } },
          phone: { expireTimestamp: { $lte: currentTimestamp } },
        },
      }
    );
  
    // Delete documents by condition
    await Token.deleteMany({
      $or: [
        // Case 1: Both `email` and `phone` fields exist and are empty arrays
        {
          email: { $exists: true, $size: 0 },
          phone: { $exists: true, $size: 0 },
        },
  
        // Case 2: `email` field does not exist, and `phone` field exists and is an empty array
        {
          email: { $exists: false },
          phone: { $exists: true, $size: 0 },
        },
  
        // Case 3: `phone` field does not exist, and `email` field exists and is an empty array
        {
          phone: { $exists: false },
          email: { $exists: true, $size: 0 },
        },
      ],
    });
  }
  