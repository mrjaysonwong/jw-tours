import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import connectMongo from '@/services/db/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { sendEmailLink } from '@/services/auth/sendEmailLink';
import { ACTION_TYPES } from '@/constants/api';

// POST: /api/v1/auth/send-signin-email-link
export async function POST(Request) {
  try {
    const referer = Request.headers.get('referer');
    const refererUrl = new URL(referer);
    const callbackUrl = refererUrl.searchParams.get('callbackUrl');

    const { email } = await Request.json();

    await emailSchema.validate({ email }, { abortEarly: false });

    // connect to the database
    await connectMongo();

    const actionType = ACTION_TYPES.SIGNIN;
    const statusCode = await sendEmailLink(email, actionType, callbackUrl);

    return Response.json(
      {
        statusText: `A sign-in link has been sent to ${email}`,
      },
      { status: statusCode ?? 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
