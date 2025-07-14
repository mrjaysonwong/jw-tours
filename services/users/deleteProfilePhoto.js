// internal imports
import User from '@/models/userModel';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common.js';
import cloudinary from '@/libs/cloudinary';

export async function deleteProfilePhoto(userId, userExists) {
  try {
    const imageId = userExists?.image?.public_id;

    if (imageId) {
      await cloudinary.uploader.destroy(imageId);
    }

    const result = await User.updateOne(
      { _id: userId },
      { $set: { image: { public_id: null, url: null } } }
    );

    if (result.matchedCount === 0) {
      throw new HttpError({
        message: 'Failed to delete image.',
        status: STATUS_CODES.SERVER_ERROR,
      });
    }
  } catch (error) {
    throw error;
  }
}
