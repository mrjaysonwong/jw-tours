import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { HttpError } from '@/helpers/errorHelpers';
import connectMongo from '@/libs/connectMongo';
import User from '@/models/userModel';
import { findUserById } from '@/services/users/userQueries';
import { STATUS_CODES } from '@/constants/common';

// PATCH: /api/v1/admin/users/[id]/suspend
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const { formChecked } = await Request.json();

    if (formChecked === null || formChecked === undefined) {
      throw new HttpError({
        message: 'Form checked value is required',
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const session = await validateSession();
    await authorizeAdmin(session);

    // connect to database
    await connectMongo();
    await findUserById(userId);

    const updatedStatus = formChecked ? 'suspended' : 'active';
    const message = formChecked
      ? 'User has been suspended.'
      : 'User suspension has been lifted';

    await User.updateOne({ _id: userId }, { $set: { status: updatedStatus } });

    return Response.json({ message }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
