'use server';
import { cookies } from 'next/headers';

// internal imports
import Navbar from './Navbar';
import { getCurrencyFromCookies } from '@/helpers/pageHelpers';

export default async function NavbarWrapper() {
  const currency = getCurrencyFromCookies(cookies);

  return <Navbar currency={currency} />;
}
