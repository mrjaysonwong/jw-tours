import { auth } from '@/auth';
import connectMongo from '@/lib/connection';
import { addMobileNumber } from './Create';
import { deleteMobileNumber, updatePrimaryMobileNumber } from './Update';
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

    const { statusCode } = await addMobileNumber(Request, userId);

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

    await connectMongo();

    let newPrimaryNumber;

    if (action === 'delete') {
      await deleteMobileNumber(Request, userId);
    } else if (action === 'set-primary') {
      newPrimaryNumber = await updatePrimaryMobileNumber(Request, userId);
    }

    const responseMessage = action.includes('delete')
      ? 'Successfully Deleted'
      : `Primary number was set to ${newPrimaryNumber}`;

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
