import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/app/(features)/dashboard/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard',
};

export default async function AddUserPage() {
  const session = await auth();
  const isAdmin = session?.user?.role === 'admin';

  if (!isAdmin || !session) {
    redirect('/admin/signin');
  }


  return <AdminDashboard />;
}
