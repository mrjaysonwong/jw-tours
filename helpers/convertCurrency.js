import { safeFetch } from '@/helpers/safeFetch';
import { BASE_URL } from '@/constants/env';

// internal imports
import { UNIRATE_API_KEY } from '@/constants/env';
import {
  getCachedRate,
  setCachedRate,
  fxBuffer,
} from '@/libs/cache/currencyCache';

export async function convertCurrency(code, amounts = []) {
  if (code?.toUpperCase() === 'USD') {
    return amounts;
  }

  let rate = getCachedRate(code);

  if (!rate) {
    const res = await fetch(
      `https://api.unirateapi.com/api/rates?api_key=${UNIRATE_API_KEY}&from=USD`
    );

    const { rates } = await res.json();
    rate = rates?.[code?.toUpperCase()];

    if (!rate) {
      throw new Error(`Invalid currency code: ${code}`);
    }

    setCachedRate(code, rate);
  }

  const converted = amounts.map(
    (amount) => Math.round(amount * rate * fxBuffer * 1000) / 1000
  );

  return converted;
}
