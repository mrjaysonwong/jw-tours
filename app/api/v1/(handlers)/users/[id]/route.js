import { auth } from '@/auth';
import connectMongo from '@/services/db/connectMongo';
import User from '@/models/userModel';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/api';
import { handleApiError } from '@/helpers/errorHelpers';
import { findUserById } from '@/services/user/userQueries';

// GET:  /api/v1/users/[id]
export async function GET(Request, { params }) {
  const userId = params.id;

  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        {
          statusText: ERROR_MESSAGES.UNAUTHORIZED,
        },
        { status: STATUS_CODES.UNAUTHORIZED }
      );
    }

    const isAdmin = session?.user?.role === 'admin';

    if (session?.user?.id !== userId && !isAdmin) {
      return Response.json(
        {
          statusText: ERROR_MESSAGES.FORBIDDEN,
        },
        { status: STATUS_CODES.FORBIDDEN }
      );
    }

    // connect to database
    await connectMongo();

    const projection = {};
    const userExists = await findUserById(userId, projection);

    return Response.json({ data: userExists }, { status: 200 });
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
