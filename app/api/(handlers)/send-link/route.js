import connectMongo from '@/services/db/connectMongo';
import { sendSignInLink } from './Create';

/* baseUrl/api/send-link */
export async function POST(Request) {
  try {
    await connectMongo();

    const { message, statusCode, email } = await sendSignInLink(Request);

    return Response.json(
      {
        statusText: message,
        email: email,
      },
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
