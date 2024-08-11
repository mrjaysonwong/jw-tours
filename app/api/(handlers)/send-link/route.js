import connectMongo from '@/lib/connection';
import { createSigninLink } from './Create';
import { getTranslations } from 'next-intl/server';
import { cookies } from 'next/headers';

/* baseUrl/api/send-link */
export async function POST(Request) {
  const cookieStore = cookies();
  const { value: locale } = cookieStore.get('NEXT_LOCALE');

  const { searchParams } = new URL(Request.url);
  const action = searchParams.get('action');

  const t = await getTranslations({ locale, namespace: 'signin_page' });
  const t1 = await getTranslations({ locale, namespace: 'common' });

  try {
    await connectMongo();

    const { message, statusCode, email } = await createSigninLink(
      Request,
      action,
      t,
      t1
    );

    return Response.json(
      {
        statusText: message,
        email: email,
      },
      { status: statusCode }
    );
  } catch (error) {
    console.error(error);

    const errorMessage = error.status
      ? error.message
      : t1('errors.internal_server');

    return Response.json(
      { statusText: errorMessage },
      { status: error.status ?? 500 }
    );
  }
}
