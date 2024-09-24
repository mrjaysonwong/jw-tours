import { auth } from '@/auth';
import connectMongo from '@/services/db/connectMongo';
import { verifyAndAddEmail } from './Update';

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

    await connectMongo();

    await verifyAndAddEmail(Request, userId);

    return Response.json(
      { statusText: 'Successfully Updated!' },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);

    const errorMessage = error.status
      ? error.message
      : 'Internal Server Error';

    return Response.json(
      { statusText: errorMessage },
      { status: error.status ?? 500 }
    );
  }
}
