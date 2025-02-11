// internal imports
import { validateSession } from '@/validation/validateSesssion';
import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import { changePasswordSchema } from '@/validation/yup/user/passwordSchema';
import connectMongo from '@/services/db/connectMongo';
import { validateUserEmail } from '@/validation/validateUserEmail';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { ACTION_TYPES } from '@/constants/api';
import { sendEmailLink } from '@/services/auth/sendEmailLink';
import { updatePassword } from '@/services/user/updatePassword';

// POST: /api/v1/users/[id]/password
export async function POST(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const { email } = await Request.json();

    await emailSchema.validate({ email }, { abortEarly: false });

    // Connect to the database
    await connectMongo();

    await findUserById(userId);

    await validateUserEmail(email, userId);

    const actionType = ACTION_TYPES.FORGOT_PASSWORD;
    const statusCode = await sendEmailLink(email, actionType);

    return Response.json(
      {
        statusText: `Password reset link has been sent to ${email}`,
      },
      { status: statusCode }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}

// PATCH: /api/v1/users/[id]/password
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const formData = await Request.json();

    await changePasswordSchema.validate({ ...formData }, { abortEarly: false });

    // Connect to the database
    await connectMongo();

    const projection = 'password';
    const userExists = await findUserById(userId, projection);

    await updatePassword(formData, userId, userExists);

    return Response.json(
      {
        statusText: 'Password has been updated.',
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
