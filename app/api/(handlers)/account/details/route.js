import { auth } from '@/auth';
import User from '@/model/userModel/userModel';
import connectMongo from '@/lib/connection';
import {
  updatePersonalDetails,
  updateProfilePhoto,
  deleteProfilePhoto,
} from './Update';
import { getLocalMessage } from '@/utils/helper/errorHandler';

export async function GET(Request) {
  try {
    const searchParams = Request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const isMySettings = searchParams.get('settings');

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

    if (session.user.id !== userId) {
      return Response.json(
        {
          statusText: `You don't have permission to access the requested resource.`,
        },
        { status: 403 }
      );
    }

    await connectMongo();

    let userExists;

    if (isMySettings) {
      userExists = await User.findById(userId);
    } else {
      userExists = await User.findById(userId).select(
        'firstName lastName email image'
      );

      if (userExists.email && Array.isArray(userExists.email)) {
        userExists.email = userExists.email.filter((email) => email.isPrimary);
      }
    }

    if (!userExists) {
      return Response.json(
        {
          statusText: 'User not found.',
        },
        { status: 404 }
      );
    }

    return Response.json({ data: userExists }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        statusText: 'An error occurred while fetching data.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(Request) {
  try {
    const session = await auth();

    if (!session) {
      throw new HttpError({
        message: 'Unauthorized! You must signin first.',
        status: 401,
      });
    }

    const userId = session.user.id;

    const searchParams = Request.nextUrl.searchParams;
    const action = searchParams.get('action');

    const validActions = [
      'update-profilephoto',
      'delete-profilephoto',
      'update-personaldetails',
    ];

    if (!validActions.includes(action)) {
      return Response.json(
        { statusText: getLocalMessage('Invalid or missing parameters.') },
        { status: 400 }
      );
    }

    await connectMongo();

    if (action === 'update-profilephoto') {
      await updateProfilePhoto(Request, userId);
    } else if (action === 'delete-profilephoto') {
      await deleteProfilePhoto(userId);
    } else if (action === 'update-personaldetails') {
      await updatePersonalDetails(Request, userId);
    }

    const responseMessage = action.includes('delete')
      ? 'Successfully Deleted'
      : 'Successfully Updated';

    return Response.json(
      {
        statusText: responseMessage,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    const errorMessage = error.status
      ? error.message.split(',')
      : 'Internal Server Error. Try again.';

    return Response.json(
      {
        statusText: errorMessage,
      },
      { status: error.status ?? 500 }
    );
  }
}
