// internal imports
import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import { changePasswordSchema } from '@/validation/yup/user/passwordSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { ACTIONS } from '@/constants/common';
import { sendEmailLink } from '@/services/auth/sendEmailLink';
import { updatePassword } from '@/services/users/updatePassword';

// POST: /api/v1/users/[id]/password
export async function POST(Request, { params }) {
  const userId = params.id;

  try {
    const data = await Request.json();

    await emailSchema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();

    // connect to database
    await connectMongo();
    await authorizeUser({ session, userId });

    const actionType = ACTIONS.FORGOT_PASSWORD;
    const statusCode = await sendEmailLink(data.email, actionType);

    return Response.json(
      {
        message: `Password reset link has been sent to ${data.email}`,
      },
      { status: statusCode }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}

// PATCH: /api/v1/users/[id]/password
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const data = await Request.json();

    await changePasswordSchema.validate({ ...data }, { abortEarly: false });

    const projection = 'password';
    const { userExists } = await validateSessionAndUser(userId, projection);
    await updatePassword(data, userId, userExists);

    return Response.json(
      {
        message: 'Password has been updated.',
      },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
