import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/app/(features)/dashboard/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard',
};
const validCategories = new Set([
  'analytics',
  'sales',
  'bookings',
  'users',
  'tours',
  'payments',
  'refunds',
  'notifications',
]);
const validActions = new Set(['edit', 'new', 'reports']);

export default async function AdminDashboardSlugPage({ params }) {
  const session = await auth();
  if (session?.user?.role !== 'admin') return redirect('/admin/signin');

  const { slug = [] } = params;
  const [categorySlug, actionSlug, extraSlug] = slug;

  if (
    !validCategories.has(categorySlug) ||
    (actionSlug && !validActions.has(actionSlug)) ||
    extraSlug
  ) {
    return redirect('/admin/dashboard');
  }

  return <AdminDashboard categorySlug={categorySlug} actionSlug={actionSlug} />;
}
