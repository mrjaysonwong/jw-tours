import connectMongo from '@/lib/connection';
import { getLocalMessage } from '@/utils/helper/errorHandler';
import { sendPasswordResetLink } from './Create';
import { updatePassword } from './Update';
import { headers } from 'next/headers';

export async function POST(Request) {
  try {
    await connectMongo();

    const { statusCode, email } = await sendPasswordResetLink(Request, headers);

    return Response.json(
      { statusText: `Password reset link has been sent to ${email}` },
      { status: statusCode }
    );
  } catch (error) {
    console.error(error);

    const errorMessage = error.status ? error.message : 'Internal Server Error';

    return Response.json(
      { statusText: errorMessage },
      { status: error.status ?? 500 }
    );
  }
}

export async function PATCH(Request) {
  try {
    const { searchParams } = new URL(Request.url);
    const action = searchParams.get('action');

    const validActions = ['change-password', 'set-new-password'];

    if (!validActions.includes(action)) {
      return Response.json(
        { statusText: getLocalMessage('Invalid or missing parameters.') },
        { status: 400 }
      );
    }

    await connectMongo();

    await updatePassword(Request, action);

    return Response.json(
      { statusText: 'Successfully Updated!' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    const errorMessage = error.status
      ? error.message.split(',')
      : 'Internal Server Error';

    return Response.json(
      {
        statusText: errorMessage,
      },
      { status: error.status ?? 500 }
    );
  }
}
