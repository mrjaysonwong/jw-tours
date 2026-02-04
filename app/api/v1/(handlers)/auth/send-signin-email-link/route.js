import { emailSchema } from '@/validation/yup/user/contactDetailsSchema';
import connectMongo from '@/lib/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { sendEmailLink } from '@/services/auth/sendEmailLink';
import { ACTIONS } from '@/constants/common';

// POST: /api/v1/auth/send-signin-email-link
export async function POST(Request) {
  try {
    const referer = Request.headers.get('referer');
    const refererUrl = new URL(referer);
    const callbackUrl = refererUrl.searchParams.get('callbackUrl');

    const data = await Request.json();

    await emailSchema.validate({ ...data }, { abortEarly: false });

    // connect to the database
    await connectMongo();

    const actionType = ACTIONS.SIGNIN;
    const statusCode = await sendEmailLink(data.email, actionType, callbackUrl);

    return Response.json(
      {
        message: `A sign-in link has been sent to ${data.email}`,
      },
      { status: statusCode ?? 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
