// internal imports
import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import { changePasswordSchema } from '@/validation/yup/user/passwordSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { ACTIONS } from '@/constants/common';
import { sendEmailLink } from '@/services/auth/sendEmailLink';
import { updatePassword } from '@/services/user/updatePassword';

// POST: /api/v1/users/[id]/password
export async function POST(Request, { params }) {
  const userId = params.id;

  try {
    const { email } = await Request.json();

    await emailSchema.validate({ email }, { abortEarly: false });

    await validateSessionAndUser(userId);

    const actionType = ACTIONS.FORGOT_PASSWORD;
    const statusCode = await sendEmailLink(email, actionType);

    return Response.json(
      {
        message: `Password reset link has been sent to ${email}`,
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
    const formData = await Request.json();

    await changePasswordSchema.validate({ ...formData }, { abortEarly: false });

    const projection = 'password';
    const {userExists} = await validateSessionAndUser(userId, projection);
    await updatePassword(formData, userId, userExists);

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
