import connectMongo from '@/lib/connection';
import { createSigninLink } from './Create';
// import { unstable_noStore as noStore } from 'next/cache';




/* baseUrl/api/send-link */
export async function POST(Request) {
  // noStore();
  try {
    await connectMongo();

    const { message, email } = await createSigninLink(Request);

    return Response.json(
      {
        statusText: message,
        email: email,
      },
      { status: 201 }
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
