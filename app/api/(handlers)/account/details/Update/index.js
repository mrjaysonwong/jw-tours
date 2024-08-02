import User from '@/model/userModel/userModel';
import cloudinary from '@/utils/config/cloudinary';
import { getValidationError } from '@/utils/helper/errorHandler';
import { personalDetailsSchema } from '@/lib/validation/yup/personalDetailsSchema';
import { findUserById } from '@/utils/helper/query/User';
import { HttpError } from '@/utils/helper/errorHandler';

export async function updateProfilePhoto(Request, userId) {
  try {
    const body = await Request.json();
    const { croppedImage } = body;

    const userExists = await findUserById(userId);

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
      });
    }

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
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteProfilePhoto(userId) {
  try {
    const userExists = await findUserById(userId);

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
      });
    }

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
        status: 500,
      });
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updatePersonalDetails(Request, userId) {
  try {
    const body = await Request.json();

    await personalDetailsSchema.validate({ ...body }, { abortEarly: false });

    const userExists = await findUserById(userId);

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
      });
    }

    await User.updateOne({ _id: userId }, { $set: body });
  } catch (error) {
    console.error(error);
    getValidationError(error);

    throw error;
  }
}
