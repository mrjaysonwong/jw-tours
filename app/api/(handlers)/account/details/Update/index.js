import User from '@/models/userModel/userModel';
import cloudinary from '@/services/cloudinary';
import { getValidationError } from '@/helpers/errorHelpers';
import { personalDetailsSchema } from '@/helpers/validation/yup/schemas/personalDetailsSchema';
import { HttpError } from '@/helpers/errorHelpers';

export async function updateProfilePhoto(Request, userId) {
  try {
    const { croppedImage } = await Request.json();

    const userExists = await User.findById(userId).select('image');

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
    console.error('Error while updating image', error.message);
    throw error;
  }
}

export async function deleteProfilePhoto(userId) {
  try {
    const userExists = await User.findById(userId).select('image');

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
    console.error('Error while deleting image.', error.message);
    throw error;
  }
}

export async function updatePersonalDetails(Request, userId) {
  try {
    const body = await Request.json();

    await personalDetailsSchema.validate({ ...body }, { abortEarly: false });

    const projectedFields = {
      default: 'firstName lastName gender dateOfBirth nationality address',
    };

    const userExists = await User.findById(userId).select(
      projectedFields.default
    );

    if (!userExists) {
      throw new HttpError({
        message: 'User not found.',
        status: 404,
      });
    }

    await User.updateOne({ _id: userId }, { $set: body });
  } catch (error) {
    console.error('Error while updating personal details.', error.message);
    getValidationError(error);

    throw error;
  }
}
