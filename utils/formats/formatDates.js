import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(utc);
dayjs.extend(localizedFormat);

export function formatUTC(timestamp, customFormat = false) {
  return customFormat
    ? dayjs().utc().format('YYYY-MM-DD HH:mm:ss')
    : dayjs.utc(timestamp).local().format();
}

export function formatISO(timestamp) {
  return dayjs(timestamp).utc().local().format('YYYY-MM-DD');
}

export function formatISOlong(timestamp, customFormat = false) {
  return customFormat
    ? dayjs(timestamp).format('MMM DD, YYYY h:m A')
    : dayjs(timestamp).format('ll');
}

export function getDateTime(timestamp) {
  return dayjs.unix(timestamp).local().format('h:mm A');
}

export function formatFromToDate({ from, to }) {
  const fromDate = dayjs(from).startOf('day').toDate();
  const toDate = dayjs(to).add(1, 'day').startOf('day').toDate(); 
  return { fromDate, toDate };
}

export function formatEpochDate(timestamp) {
  return dayjs.unix(timestamp).format('ll');
}

export function formatDayBefore(date) {
  return dayjs(date).subtract(1, 'day').utc().local().format('LL');
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

export function formatDate2(date) {
  return date ? dayjs(date).format('YYYY-MM-DD') : '';
}
