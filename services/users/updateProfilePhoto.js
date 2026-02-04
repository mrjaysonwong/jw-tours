// internal imports
import User from '@/models/userModel';
import { HttpError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import cloudinary from '@/lib/cloudinary';

export async function updateProfilePhoto(croppedImage, userId, userExists) {
  try {
    const imageId = userExists.image?.public_id;

    const updloadRes = await cloudinary.uploader.upload(croppedImage, {
      folder: imageId ? '' : 'jwtours/avatars',
      public_id: imageId,
      allowed_formats: ['jpg'],
      format: 'jpg',
    });

    const result = await User.updateOne(
      { _id: userId },
      {
        $set: {
          image: {
            public_id: updloadRes.public_id,
            url: updloadRes.secure_url,
          },
        },
      }
    );

    if (result.matchedCount === 0) {
      throw new HttpError({
        message: 'Failed to update image.',
        status: STATUS_CODES.SERVER_ERROR,
      });
    }
  } catch (error) {
    throw error;
  }
}
