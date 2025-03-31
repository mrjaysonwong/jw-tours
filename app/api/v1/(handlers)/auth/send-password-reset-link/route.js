// internal imports
import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import connectMongo from '@/services/db/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { ACTIONS } from '@/constants/common';
import { sendEmailLink } from '@/services/auth/sendEmailLink';

// POST: /api/v1/auth/send-password-reset-link
export async function POST(Request) {
  try {
    const { email } = await Request.json();

    await emailSchema.validate({ email }, { abortEarly: false });

    // connect to the database
    await connectMongo();

    const actionType = ACTIONS.FORGOT_PASSWORD;
    const statusCode = await sendEmailLink(email, actionType);

    return Response.json(
      {
        message: `Password reset link has been sent to ${email}`,
      },
      { status: statusCode ?? 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
