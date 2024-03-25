import Verify from '@/app/components/auth/verify/Verify';
import { findUser } from '@/utils/helper/findUser';

export const metadata = {
  title: 'Verify Request',
};

export default async function VerifyPage({ searchParams }) {
  const user = await findUser(searchParams.email);

  if (!user) {
    throw new Error('Internal Server Error');
  }

  return (
    <>
      <Verify />
    </>
  );
}
