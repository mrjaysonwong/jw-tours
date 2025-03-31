import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export function formatUTC(timestamp, customFormat = false) {
  return customFormat
    ? dayjs().utc().format('YYYY-MM-DD HH:mm:ss')
    : dayjs.utc(timestamp).local().format();
}

export function formatISO(timestamp) {
  return dayjs(timestamp).utc().local().format('YYYY-MM-DD');
}

export function formatISOlong(timestamp) {
  return dayjs(timestamp).format('LL');
}

export function getDateTime(timestamp) {
  return dayjs.unix(timestamp).local().format('h:mm A');
}

export function formatEpochDate(timestamp) {
  return dayjs.unix(timestamp).format('ll');
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

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
