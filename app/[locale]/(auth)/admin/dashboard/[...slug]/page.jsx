import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AdminDashboard from '@/app/(features)/dashboard/admin/AdminDashboard';

export const metadata = {
  title: 'Admin Dashboard',
};

// Define valid actions for each category
const categoryActions = {
  analytics: [],
  sales: [],
  revenue: [],
  bookings: ['new', 'reports'],
  users: ['new'],
  tours: ['new'],
  reviews: [],
  payments: ['new', 'reports'],
  refunds: ['new', 'reports'],
  notifications: ['new', 'reports'],
};

export default async function AdminDashboardSlugPage({ params: { slug } }) {
  const session = await auth();
  
  if (session?.user?.role !== 'admin' || !session)
    return redirect('/admin/signin');

  const [categorySlug, actionSlug, extraSlug] = slug;

  if (!categoryActions[categorySlug] || extraSlug) {
    return redirect('/admin/dashboard');
  }

  const validActions = categoryActions[categorySlug];

  if (actionSlug && !validActions.includes(actionSlug)) {
    return redirect('/admin/dashboard');
  }

  return <AdminDashboard categorySlug={categorySlug} actionSlug={actionSlug} />;
}
