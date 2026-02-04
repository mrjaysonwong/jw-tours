// admin dashboard components
import Overview from '@/app/(features)/dashboard/admin/overview/Overview';
import Analytics from '@/app/(features)/dashboard/admin/analytics/Analytics';
import Sales from '@/app/(features)/dashboard/admin/sales/Sales';
import UserList from '@/app/(features)/dashboard/admin/management/users/list/UserList';
import CreateNewUser from '@/app/(features)/dashboard/admin/management/users/CreateNewUser';
import EditUser from '@/app/(features)/dashboard/admin/management/users/EditUser';
import TourList from '@/app/(features)/dashboard/admin/management/tours/TourList';
import CreateNewTour from '@/app/(features)/dashboard/admin/management/tours/CreateNewTour';
import EditTour from '@/app/(features)/dashboard/admin/management/tours/EditTour';
import Notifications from '@/app/(features)/dashboard/admin/communication/notifications/Notifications';
import NotificationsReport from '@/app/(features)/dashboard/admin/communication/notifications/NotificationsReport';
import ReviewList from '@/app/(features)/dashboard/admin/management/reviews/ReviewList';

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
import Activities from '@/app/(features)/tours/tour-details/Activities';
import Equipments from '@/app/(features)/tours/tour-details/Equipments';
import Transport from '@/app/(features)/tours/tour-details/Transport';
import Meals from '@/app/(features)/tours/tour-details/Meals';
import Accomodation from '@/app/(features)/tours/tour-details/Accomodation';

// wishlists tab components
import GuestWishlist from '@/app/(features)/wishlists/GuestWishlist';
import UserWishlist from '@/app/(features)/wishlists/UserWishlist';

export const dashboardComponents = {
  overview: Overview,
  analytics: Analytics,
  sales: Sales,
  users: UserList,
  users_new: CreateNewUser,
  tours: TourList,
  tours_new: CreateNewTour,
  reviews: ReviewList,
  notifications: Notifications,
  notifications_reports: NotificationsReport,
};

export const dashboardEditComponents = {
  users_edit: EditUser,
  tours_edit: EditTour,
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

export const tourInclusionsTabComponents = {
  Activities,
  Equipments,
  Transport,
  Meals,
  Accomodation,
};

export const wishListTabComponents = [GuestWishlist, UserWishlist];
