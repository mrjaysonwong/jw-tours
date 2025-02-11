import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/app/(features)/dashboard/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard',
};

export default async function AdminDashboardSlugPage({ params }) {
  const session = await auth();

  if (session?.user?.role !== 'admin') redirect('/admin/signin');

  const { slug } = params;

  const validSlugs = ['analytics', 'sales', 'users'];

  if (!validSlugs.includes(slug)) {
    redirect('/admin/dashboard');
  }

  return <AdminDashboard slug={slug} />;
}
