import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { unstable_noStore as noStore } from 'next/cache';

// internal imports
import { auth } from '@/auth';
import { StyledMainContainer } from '@/components/styled/StyledContainers';
import Custom404 from '@/components/errors/Custom404';
import PaymentSuccess from '@/app/(features)/payment/PaymentSuccess';
import { getAuthFetchOptions } from '@/helpers/pageHelpers';
import { fetchUserBookings } from '@/services/bookings/fetchBookings';

export const metadata = { title: 'Payment' };

export default async function PaymentStatusPage({ params, searchParams }) {
  noStore();
  const { status } = params;
  const { transactionId } = searchParams;

  if (!['success'].includes(status)) {
    return <Custom404 resource="page" />;
  }

  const session = await auth();

  if (!session) redirect('/signin');
  if (!transactionId) redirect('/bookings');

  const userId = session.user.id;
  const options = getAuthFetchOptions(cookies);

  const bookings = await fetchUserBookings({ userId, options, transactionId });

  if (!bookings?.length) {
    redirect('/bookings');
  }

  return (
    <StyledMainContainer>
      <PaymentSuccess
        transactionId={transactionId}
        email={session.user.email}
      />
    </StyledMainContainer>
  );
}
