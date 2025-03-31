import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { handleApiError } from '@/helpers/errorHelpers';
import { updateProfilePhoto, deleteProfilePhoto } from '@/services/user';
import { updatePhotoSchema } from '@/validation/yup/user/profilePhotoSchema';

// PATCH: /api/v1/users/[id]/profile-photo
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const requestData = await Request.json();

    const schema = updatePhotoSchema(requestData.actionType);
    await schema.validate({ ...requestData }, { abortEarly: false });

    const projection = 'image';
    const { userExists } = await validateSessionAndUser(userId, projection);

    if (requestData.actionType === 'delete-photo') {
      await deleteProfilePhoto(userId, userExists);
    } else {
      await updateProfilePhoto(requestData.croppedImage, userId, userExists);
    }

    return Response.json(
      {
        message: 'Successfully Updated',
      },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
