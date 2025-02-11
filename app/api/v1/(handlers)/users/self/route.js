// internal imports
import { auth } from '@/auth';
import { HttpError, handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES, ERROR_MESSAGES } from '@/constants/api';
import connectMongo from '@/services/db/connectMongo';
import User from '@/models/userModel';
import { PROJECTED_FIELDS } from '@/constants/projected_fields';

// GET: /api/v1/users/self
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const isProjected = searchParams.get('projection') === 'basic';

  const session = await auth();

  try {
    if (!session) {
      throw new HttpError({
        message: ERROR_MESSAGES.UNAUTHORIZED,
        status: STATUS_CODES.UNAUTHORIZED,
      });
    }

    await connectMongo();

    let userExists;

    if (session) {
      if (isProjected) {
        userExists = await User.findById(session.user.id).select(
          PROJECTED_FIELDS.DEFAULT
        );

        userExists.email = userExists.email[0];
      } else {
        userExists = await User.findById(session?.user?.id);
      }

      if (!userExists) {
        throw new HttpError({
          message: ERROR_MESSAGES.USER_NOT_FOUND,
          status: STATUS_CODES.NOT_FOUND,
        });
      }
    }

    return Response.json({ data: userExists }, { status: 200 });
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
