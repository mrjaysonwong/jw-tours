// /app/api/guest/set-cookie/route.ts
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = cookies();
  let guestId = cookieStore.get('guest_id')?.value;

  if (!guestId) {
    guestId = nanoid();
    cookieStore.set('guest_id', guestId, {
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
      httpOnly: false,
      secure: false
    });
  }

  return Response.json({guestId}, {status: 200});
}
