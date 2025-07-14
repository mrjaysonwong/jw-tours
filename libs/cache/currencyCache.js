import NodeCache from 'node-cache';

// TTL = 86400 seconds (24 hours)
const cache = new NodeCache({ stdTTL: 86400 });

// protect against forex rate fluctuations
export const fxBuffer = 1.02;

export const getCachedRate = (currencyCode) => cache.get(currencyCode);

export const setCachedRate = (currencyCode, rate) =>
  cache.set(currencyCode, rate);
