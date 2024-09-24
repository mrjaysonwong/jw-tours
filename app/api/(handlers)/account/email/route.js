import { auth } from '@/auth';
import connectMongo from '@/services/db/connectMongo';
import { sendEmailOTP } from './Create';
import { deleteEmailAddress, updatePrimaryEmail } from './Update';
import { getLocalMessage } from '@/helpers/errorHelpers';

export async function POST(Request) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        { statusText: 'Unauthorized! You must signin first.' },
        { status: 401 }
      );
    }

    const { id: userId, name } = session?.user;

    await connectMongo();

    const { statusCode } = await sendEmailOTP(Request, userId, name);

    return Response.json({ statusText: 'OTP sent!' }, { status: statusCode });
  } catch (error) {
    console.error(error);

    const errorMessage = error.status
      ? error.message.split(',')
      : 'Internal Server Error';

    return Response.json(
      { statusText: errorMessage },
      { status: error.status ?? 500 }
    );
  }
}

export async function PATCH(Request) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        { statusText: 'Unauthorized! You must signin first.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    const searchParams = Request.nextUrl.searchParams;
    const action = searchParams.get('action');

    const validActions = ['delete', 'set-primary'];

    if (!validActions.includes(action)) {
      return Response.json(
        { statusText: getLocalMessage('Invalid or missing parameters.') },
        { status: 400 }
      );
    }

    const { email } = await Request.json();

    if (!email) {
      return Response.json(
        { statusText: 'Input email address.' },
        { status: 400 }
      );
    }

    await connectMongo();

    let updatedEmail;

    if (action === 'delete') {
      await deleteEmailAddress(email, userId);
    } else if (action === 'set-primary') {
      updatedEmail = await updatePrimaryEmail(email, userId);
    }

    const responseMessage = action.includes('delete')
      ? 'Successfully Deleted'
      : `Primary Email was set to ${updatedEmail}`;

    return Response.json(
      {
        statusText: responseMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    const errorMessage = error.status
      ? error.message
      : 'Internal Server Error. Try again.';

    return Response.json(
      { statusText: errorMessage },
      { status: error.status ?? 500 }
    );
  }
}
