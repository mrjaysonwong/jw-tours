// admin dashboard components
import Overview from '@/app/(features)/dashboard/admin/overview/Overview';
import Analytics from '@/app/(features)/dashboard/admin/analytics/Analytics';
import Sales from '@/app/(features)/dashboard/admin/sales/Sales';
import UserList from '@/app/(features)/dashboard/admin/management/users/UserList';
import CreateNewUser from '@/app/(features)/dashboard/admin/management/users/CreateNewUser';
import EditUser from '@/app/(features)/dashboard/admin/management/users/EditUser';
import TourList from '@/app/(features)/dashboard/admin/management/tours/TourList';
import CreateNewTour from '@/app/(features)/dashboard/admin/management/tours/CreateNewTour';
import Notifications from '@/app/(features)/dashboard/admin/communication/notifications/Notifications';
import NotificationsReport from '@/app/(features)/dashboard/admin/communication/notifications/NotificationsReport';

// mysettings tab components
import Profile from '@/app/(features)/account/profile/Profile';
import Preferences from '@/app/(features)/account/preferences/Preferences';
import Security from '@/app/(features)/account/security/Security';
import PaymentDetails from '@/app/(features)/account/payment-details/PaymentDetails';

// hero landing tab components
import {
  TabPanelOne,
  TabPanelTwo,
  TabPanelThree,
  TabPanelFour,
  TabPanelFive,
} from '@/components/heros';

// profile settings tab components
import PersonalDetails from '@/app/(features)/account/personal-details/PersonalDetails';
import ContactInformation from '@/app/(features)/account/contact-information/ContactInformation';
import { SecurityCard } from '@/app/(features)/account/security/Security';

// notifictions tab components
import AllNotifications from '@/app/(features)/notifications/AllNotifications';
import UnreadNotifications from '@/app/(features)/notifications/UnreadNotifications';

// tour inclusions tab components
import Activities from '@/app/(features)/tours/Activities';
import Equipments from '@/app/(features)/tours/Equipments';
import Transport from '@/app/(features)/tours/Transport';
import Meals from '@/app/(features)/tours/Meals';
import Accomodation from '@/app/(features)/tours/Accomodation';

export const dashboardComponents = {
  overview: Overview,
  analytics: Analytics,
  sales: Sales,
  users: UserList,
  users_new: CreateNewUser,
  tours: TourList,
  tours_new: CreateNewTour,
  notifications: Notifications,
  notifications_reports: NotificationsReport,
};

export const dashboardEditComponents = {
  users_edit: EditUser,
};

export const mySettingsTabComponents = [
  Profile,
  Preferences,
  Security,
  PaymentDetails,
];

export const heroTabComponents = [
  TabPanelOne,
  TabPanelTwo,
  TabPanelThree,
  TabPanelFour,
  TabPanelFive,
];

export const profileSettingsTabComponents = [
  PersonalDetails,
  ContactInformation,
];

export const adminEditUserTabComponents = [
  PersonalDetails,
  ContactInformation,
  SecurityCard,
];

export const notificationsTabComponents = [
  AllNotifications,
  UnreadNotifications,
];

export const tourInclusionsTabComponents = [
  Activities,
  Equipments,
  Transport,
  Meals,
  Accomodation,
];
