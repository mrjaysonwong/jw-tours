// dashboard components
import Overview from '@/app/(features)/dashboard/admin/overview/Overview';
import Analytics from '@/app/(features)/dashboard/admin/analytics/Analytics';
import Sales from '@/app/(features)/dashboard/admin/sales/Sales';
import UserList from '@/app/(features)/dashboard/admin/management/users/UserList';
import AddUser from '@/app/(features)/dashboard/admin/management/users/AddNewUser';
import EditUser from '@/app/(features)/dashboard/admin/management/users/EditUser';

// mysettings tab components
import PersonalDetails from '@/app/(features)/account/profile/Profile';
import Preferences from '@/app/(features)/account/preferences/Preferences';
import Security from '@/app/(features)/account/security/Security';
import PaymentDetails from '@/app/(features)/account/payment-details/PaymentDetails';

export const dashboardComponents = {
  overview: Overview,
  analytics: Analytics,
  sales: Sales,
  users: UserList,
  edit: EditUser,
  add: AddUser,
};

export const tabComponents = [
  PersonalDetails,
  Preferences,
  Security,
  PaymentDetails,
];
