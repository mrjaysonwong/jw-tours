import MailIcon from '@mui/icons-material/Mail';
import SmsIcon from '@mui/icons-material/Sms';
import OpenInBrowserIcon from '@mui/icons-material/OpenInBrowser';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

export const adminNotificationTypes = {
  email: {
    icon: <MailIcon />,
  },
  sms: { icon: <SmsIcon /> },
  'in-app': { icon: <OpenInBrowserIcon /> },
  push: { icon: <NotificationImportantIcon /> },
};

export function getDurationInDays(duration) {
  const match = duration.match(/\d+/);
  return match
    ? duration.includes('week')
      ? parseInt(match[0]) * 7
      : parseInt(match[0])
    : 0;
}

export const getAddressParts = (
  option,
  fields = ['name', 'neighbourhood', 'city', 'state', 'country']
) => fields.map((field) => option[field]).filter(Boolean);
