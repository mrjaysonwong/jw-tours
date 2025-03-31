import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { handleApiError } from '@/helpers/errorHelpers';

// GET: /api/v1/users/[id]
export async function GET(Request, { params }) {
  const userId = params.id;

  try {
    const { userExists } = await validateSessionAndUser(userId);

    const updatedUser = {
      ...userExists.toObject(), // convert to plain object, stripping out mongoose-specific properties
      hasPassword: !!userExists.password,
    };

    delete updatedUser.password;

    return Response.json({ data: updatedUser }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
