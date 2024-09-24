import { auth } from '@/auth';
import connectMongo from '@/services/db/connectMongo';
import User from '@/models/userModel/userModel';
import { getLocalMessage } from '@/helpers/errorHelpers';

export async function PATCH(Request) {
  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        {
          statusText:
            'Unauthorized. Authentication is required to access this resource.',
        },
        { status: 401 }
      );
    }

    const { id: userId } = session.user;

    const searchParams = Request.nextUrl.searchParams;
    const action = searchParams.get('action');

    const body = await Request.json();

    const validActions = ['update-language'];

    if (!validActions.includes(action)) {
      return Response.json(
        { statusText: getLocalMessage('Invalid or missing parameters.') },
        { status: 400 }
      );
    }

    await connectMongo();

    let updatedUser;

    if (action === 'update-language') {
      updatedUser = await User.findOneAndUpdate(
        { _id: userId },
        { $set: body },
        { new: true }
      );
    }

    return Response.json(
      {
        statusText: 'Successfully Updated',
        lang: updatedUser.languageCountry,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        statusText: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
