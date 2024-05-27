import { auth } from '@/auth';
import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import connectMongo from '@/lib/connection';
import { changeProfilePhoto, deleteProfilePhoto } from './(CRUD)/Update';

export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

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
        message:
          'Forbidden. You dont have permission to access the requested resource.',
      },
      { status: 403 }
    );
  }

  await connectMongo();

  const userExists = await User.findById(userId);

  if (!userExists) {
    return Response.json(
      {
        message: 'User Not Found',
      },
      { status: 403 }
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

  if (!mode || !['update-profilephoto', 'delete-profilephoto'].includes(mode)) {
    return Response.json(
      { message: 'An error occured. Try again.' },
      { status: 400 }
    );
  }

  try {
    if (mode === 'update-profilephoto') {
      await changeProfilePhoto(userId, Request, Response);

      return Response.json(
        { message: 'Successfully Updated!' },
        { status: 200 }
      );
    } else if (mode === 'delete-profilephoto') {
      await deleteProfilePhoto(userId, Response);

      return Response.json(
        { message: 'Successfully Updated!' },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);

    return Response.json(
      { message: 'Internal Server Error. Try again.' },
      { status: 500 }
    );
  }

  // if (mode === 'update-profilephoto') {
  //   try {
  //     await changeProfilePhoto(userId, Request, Response);

  //     return Response.json(
  //       { message: 'Successfully Updated!' },
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     console.error(error);

  //     return Response.json(
  //       { message: 'Internal Server Error. Try again.' },
  //       { status: 500 }
  //     );
  //   }
  // }

  // if (mode === 'delete-profilephoto') {
  //   try {
  //     await deleteProfilePhoto(userId, Response);

  //     return Response.json(
  //       { message: 'Successfully Deleted!' },
  //       { status: 200 }
  //     );
  //   } catch (error) {
  //     console.error(error);

  //     return Response.json(
  //       { message: 'Internal Server Error. Try again.' },
  //       { status: 500 }
  //     );
  //   }
  // }
}
