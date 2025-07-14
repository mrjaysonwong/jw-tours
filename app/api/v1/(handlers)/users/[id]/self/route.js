import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';

// GET: /api/v1/users/[id]/self
export async function GET(Request, { params }) {
  const userId = params.id;

  try {
    const session = await validateSession();

    // connect to database
    await connectMongo();
    const userExists = await authorizeUser({ session, userId });

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
