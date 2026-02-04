export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getDurationInDays = (duration) => {
  if (!duration) return 0;

  const { value, unit } = duration;

  if (!value || !unit) return 0;

  if (unit.includes('week')) return value * 7;
  if (unit.includes('day')) return value;

  return 0; // for hours, minutes, etc.
};

export const getAddressParts = (
  option,
  fields = [
    'name',
    'road',
    'neighbourhood',
    'suburb',
    'city',
    'state',
    'country',
  ]
) => fields.map((field) => option[field]).filter(Boolean);

export const getDistanceInKm = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Radius of the Earth in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

export const getCancellationStatus = (tourDate, cutOffHours) => {
  const now = new Date();
  const tourStart = new Date(tourDate);

  const cutOffDate = new Date(tourDate);
  cutOffDate.setHours(cutOffDate.getHours() - cutOffHours);

  const isUpcomingTour = tourStart > now;
  const isCancellable = now < cutOffDate;

  return { isUpcomingTour, isCancellable, cutOffDate };
};

export const getExpireTimestamp = () => {
  const ms = 7200000; // expire at 30mins
  const expireTimestamp = Date.now() + ms;
  const expireAt = new Date(expireTimestamp);

  return expireAt;
};
