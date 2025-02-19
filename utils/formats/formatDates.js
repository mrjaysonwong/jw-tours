import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatUTC(date) {
  return dayjs.utc(date).local().format();
}

export function formatDate(epochTime) {
  const date = new Date(epochTime);

  //   return date.toLocaleString('default', {
  //   day: 'numeric',
  //   month: 'long',
  //   year: 'numeric',
  //   hour: 'numeric',
  //   minute: 'numeric',
  // });

  const options = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZoneName: 'short',
    hour12: false, // Use 24-hour format
  };

  // as of 2020 Intl API is supported across major browsers
  const formatter = new Intl.DateTimeFormat('default', options);
  const formattedString = formatter.format(date);

  return formattedString;
}
