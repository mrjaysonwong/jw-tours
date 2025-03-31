import { unstable_noStore as noStore } from 'next/cache';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';

import Checkout from '@/app/(features)/bookingrequest/Checkout';



export default async function BookingRequestPage({ searchParams, params }) {



    
  return <Checkout />;
}
