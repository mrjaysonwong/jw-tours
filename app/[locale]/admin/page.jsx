import { auth } from '@/auth';
import { redirect } from 'next/navigation';

export default async function AdminPage() {
  const session = await auth();
  const role = session?.user?.role;

  if (!session || role !== 'admin') {
    redirect('/admin/signin');
  } else {
    redirect('/admin/dashboard');
  }
}
