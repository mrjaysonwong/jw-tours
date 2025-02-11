import { RateLimiterMemory } from 'rate-limiter-flexible';

const opts = {
  points: 1,
  duration: 60, // 60 secs per request
};

export const rateLimiter = new RateLimiterMemory(opts);


