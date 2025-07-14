import { PAYMONGO_SECRET_KEY } from '@/constants/env';

export const encodeKey = Buffer.from(PAYMONGO_SECRET_KEY).toString('base64');
