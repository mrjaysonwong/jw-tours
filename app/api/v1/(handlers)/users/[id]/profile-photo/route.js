import { validateSession } from '@/validation/validateSesssion';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { updateProfilePhoto, deleteProfilePhoto } from '@/services/user';
import { updatePhotoSchema } from '@/validation/yup/user/profilePhotoSchema';

// PATCH: /api/v1/users/[id]/profile-photo
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const requestData = await Request.json();

    const schema = updatePhotoSchema(requestData.actionType);
    await schema.validate({ ...requestData }, { abortEarly: false });

    // connect to database
    await connectMongo();

    const projection = 'image';
    const userExists = await findUserById(userId, projection);

    if (requestData.actionType === 'delete-photo') {
      await deleteProfilePhoto(userId, userExists);
    } else {
      await updateProfilePhoto(requestData.croppedImage, userId, userExists);
    }

    return Response.json(
      {
        statusText: 'Successfully Updated',
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
