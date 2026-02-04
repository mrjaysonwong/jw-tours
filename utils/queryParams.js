import { defaultPage, defaultLimit } from '@/constants/pagination';
import { formatValue, escapeRegex } from '@/utils/formats/common';

export function normalizeQueryValues(paramsObj) {
  return {
    ...paramsObj,
    geoLocation: formatValue(paramsObj.geoLocation),
    destination: formatValue(paramsObj.destination),
  };
}

export function sanitizeQueryParams(
  searchParams,
  allowedQueryParams,
  options = {}
) {
  const { isServerComponent = false } = options;

  const queryParams = isServerComponent
    ? new URLSearchParams()
    : new URLSearchParams(searchParams);

  const sanitized = new URLSearchParams();

  for (const key of allowedQueryParams) {
    const rawValue = isServerComponent
      ? searchParams[key]
      : queryParams.get(key);

    if (!rawValue) continue;

    const value = String(rawValue)
      .trim() // remove spaces
      .replace(/[<>]/g, ''); // strip HTML tags / XSS attempts

    sanitized.set(key, value);
  }

  return sanitized;
}

export function filterParams(paramsObj) {
  return new URLSearchParams(
    Object.fromEntries(Object.entries(paramsObj).filter(([_, v]) => v))
  );
}

export function getQueryParams(searchParams) {
  const getParam = (key, fallback = '') => searchParams.get(key) ?? fallback;

  return {
    pageParam: parseInt(getParam('page', defaultPage), 10),
    limitParam: parseInt(getParam('limit', defaultLimit), 10),
    searchQuery: getParam('q'),
    sortParam: getParam('sort'),
    tabParam: getParam('tab'),
    roleParam: getParam('role'),
    minDurationParam: getParam('minDuration'),
    maxDurationParam: getParam('maxDuration'),
    transportationParam: getParam('transportation'),
  };
}

export function buildDurationQuery(minDuration, maxDuration) {
  const min = parseInt(minDuration, 10) || 1;
  const max = parseInt(maxDuration, 10) || 5;

  if (min === 24) {
    return {
      'duration.unit': { $in: ['day', 'days', 'week', 'weeks'] },
    };
  }

  // mixed: hours + multi-day
  if (max === 24) {
    return {
      $or: [
        {
          'duration.value': { $gte: min, $lte: 24 },
          'duration.unit': { $in: ['hour', 'hours'] },
        },
        {
          'duration.unit': { $in: ['day', 'days', 'week', 'weeks'] },
        },
      ],
    };
  }

  return {
    'duration.value': { $gte: min, $lte: max },
    'duration.unit': { $in: ['hour', 'hours'] },
  };
}

export function buildSearchQuery(q) {
  if (!q) return {};

  const safeQuery = escapeRegex(q);
  const regexFilter = { $regex: safeQuery, $options: 'i' };

  return {
    $or: [{ 'destination.name': regexFilter }, { geoLocation: regexFilter }],
  };
}

export function buildTourQuery({
  q,
  minDuration,
  maxDuration,
  transportationList,
}) {
  return {
    ...(q && { ...buildSearchQuery(q) }),
    ...(minDuration &&
      maxDuration &&
      buildDurationQuery(minDuration, maxDuration)),
    ...(transportationList.length > 0 && {
      'transportation.type': { $in: transportationList },
    }),
  };
}
