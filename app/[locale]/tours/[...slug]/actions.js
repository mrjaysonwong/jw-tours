'use server';

import { cookies } from 'next/headers';
import { nanoid } from 'nanoid';

export async function getOrCreateGuestId() {
  const cookieStore = cookies();
  let guestId = cookieStore.get('guest_id')?.value;

  if (!guestId) {
    guestId = nanoid();
    cookieStore.set('guest_id', guestId, {
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return guestId;
}
