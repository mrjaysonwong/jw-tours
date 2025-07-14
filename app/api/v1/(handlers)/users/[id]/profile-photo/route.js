import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { updateProfilePhoto, deleteProfilePhoto } from '@/services/users';
import { updatePhotoSchema } from '@/validation/yup/user/profilePhotoSchema';

const projection = 'image';

// PATCH: /api/v1/users/[id]/profile-photo
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const data = await Request.json();

    const schema = updatePhotoSchema(data.actionType);
    await schema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();

    // connect to database
    await connectMongo();
    const userExists = await authorizeUser({ session, userId, projection });

    if (data.actionType === 'delete-photo') {
      await deleteProfilePhoto(userId, userExists);
    } else {
      await updateProfilePhoto(data.croppedImage, userId, userExists);
    }

    return Response.json({ message: 'Successfully Updated' }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
