import MailIcon from '@mui/icons-material/Mail';
import SmsIcon from '@mui/icons-material/Sms';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import AirportShuttleOutlinedIcon from '@mui/icons-material/AirportShuttleOutlined';
import CommuteOutlinedIcon from '@mui/icons-material/CommuteOutlined';
import DirectionsWalkOutlinedIcon from '@mui/icons-material/DirectionsWalkOutlined';

export const adminNotificationTypes = {
  email: {
    icon: <MailIcon />,
  },
  sms: { icon: <SmsIcon /> },
  'in-app': { icon: <OpenInBrowserIcon /> },
  push: { icon: <NotificationImportantIcon /> },
};

export const iconMapping = {
  walking: <DirectionsWalkOutlinedIcon />,
  public: <CommuteOutlinedIcon />,
  private: <AirportShuttleOutlinedIcon />,
};

export const visaIcon =
  'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/visa.svg';
export const masterCardIcon =
  'https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/main/flat-rounded/mastercard.svg';
export const genericCardIcon =
  'https://raw.githubusercontent.com/datatrans/payment-logos/master/assets/generic/card-generic.svg';
