import { auth } from '@/auth';
import connectMongo from '@/lib/connection';
import { addEmailAddress } from './Create';
import { deleteEmailAddress, updatePrimaryEmail } from './Update';
import { getLocalMessage } from '@/utils/helper/errorHandler';

export async function POST(Request) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        { statusText: 'Unauthorized! You must signin first.' },
        { status: 401 }
      );
    }

    const userId = session.user.id;

    await connectMongo();

   await addEmailAddress(Request, userId);

    return Response.json({ statusText: 'OTP sent!' }, { status: 201 });
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

    await connectMongo();

    let updatedEmail;

    if (action === 'delete') {
      await deleteEmailAddress(Request, userId);
    } else if (action === 'set-primary') {
      updatedEmail = await updatePrimaryEmail(Request, userId);
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
