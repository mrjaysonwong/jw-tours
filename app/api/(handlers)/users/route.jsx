import { auth } from '@/auth';
import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import connectMongo from '@/lib/connection';
import {
  changeProfilePhoto,
  deleteProfilePhoto,
  updatePersonalDetails,
  addEmailAddress,
} from './(CRUD)/Update';
import { getErrorMessage } from '@/utils/helper/errorHandler';

export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const isMySettings = searchParams.get('settings');

  const session = await auth();

  if (!session) {
    return Response.json(
      {
        message:
          'Unauthorized. Authentication is required to access this resource.',
      },
      { status: 401 }
    );
  }

  if (session?.user.id !== userId) {
    return Response.json(
      {
        message: `You don't have permission to access the requested resource.`,
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
  }

  if (!userExists) {
    return Response.json(
      {
        message: 'User Not Found',
      },
      { status: 404 }
    );
  }

  return Response.json({ data: userExists }, { status: 200 });
}

// export function POST(Request) {
//   const { body } = Request.body;

//   return Response.json({ data: body });
// }

export async function PATCH(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const userId = searchParams.get('userId');
  const mode = searchParams.get('mode');

  if (
    !mode ||
    ![
      'update-profilephoto',
      'delete-profilephoto',
      'update-personaldetails',
      'add-email',
    ].includes(mode)
  ) {
    return Response.json(
      { message: getErrorMessage('Invalid or missing parameters.') },
      { status: 400 }
    );
  }

  try {
    if (mode === 'update-profilephoto') {
      await changeProfilePhoto(userId, Request, Response);
    } else if (mode === 'delete-profilephoto') {
      await deleteProfilePhoto(userId);
    } else if (mode === 'update-personaldetails') {
      await updatePersonalDetails(userId, Request);
    } else if (mode === 'add-email') {
      await addEmailAddress(userId, Request);
    }

    return Response.json(
      { message: mode === 'add-email' ? 'OTP sent!' : 'Successfully Updated!' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: error.status
          ? error.message
          : 'Internal Server Error. Try again.',
      },
      { status: error.status ?? 500 }
    );
  }
}
