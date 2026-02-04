// internal imports
import { UNIRATE_API_KEY } from '@/constants/env';
import {
  getCachedRate,
  setCachedRate,
  fxBuffer,
} from '@/lib/cache/currencyCache';

export async function convertCurrency(code, amounts = []) {
  const currencyCode = code?.toUpperCase();

  if (currencyCode === 'USD' || !currencyCode) {
    return amounts;
  }

  let rate = getCachedRate(currencyCode);

  if (!rate) {
    // No cache hit, fetch new rate
    const res = await fetch(
      `https://api.unirateapi.com/api/rates?api_key=${UNIRATE_API_KEY}&from=USD`
    );

    const { rates } = await res.json();
    rate = rates?.[currencyCode];

    if (!rate) {
      throw new Error(`Invalid currency code: ${currencyCode}`);
    }

    setCachedRate(currencyCode, rate);
  }

  const converted = amounts.map(
    (amount) => Math.round(amount * rate * fxBuffer * 1000) / 1000
  );

  return converted;
}

export async function convertPricing(pricing, currencyCode) {
  const { tourCost, serviceFee, perPersonFee = 0 } = pricing;

  const [cTour, cService, cPerson] = await convertCurrency(currencyCode, [
    tourCost,
    serviceFee,
    perPersonFee,
  ]);

  return {
    convertedPricing: {
      tourCost: cTour,
      serviceFee: cService,
      perPersonFee: cPerson,
    },
    convertedTotalCost: cTour + cService + cPerson,
  };
}
