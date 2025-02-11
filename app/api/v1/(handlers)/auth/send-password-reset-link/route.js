// internal imports
import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import connectMongo from '@/services/db/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { ACTION_TYPES } from '@/constants/api';
import { sendEmailLink } from '@/services/auth/sendEmailLink';

// POST: /api/v1/auth/send-password-reset-link
export async function POST(Request) {
  try {
    const { email } = await Request.json();

    await emailSchema.validate({ email }, { abortEarly: false });

    // connect to the database
    await connectMongo();

    const actionType = ACTION_TYPES.FORGOT_PASSWORD;
    const statusCode = await sendEmailLink(email, actionType);

    return Response.json(
      {
        statusText: `Password reset link has been sent to ${email}`,
      },
      { status: statusCode ?? 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
