import connectMongo from '@/lib/connection';
import { createSigninLink } from './Create';
import { unstable_noStore as noStore } from 'next/cache';

export const maxDuration = 20; // This function can run for a maximum of 5 seconds
export const dynamic = 'force-dynamic';


/* baseUrl/api/send-link */
export async function POST(Request) {
  noStore();
  try {
    await connectMongo();

    const { message, statusCode, email } = await createSigninLink(Request);

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
