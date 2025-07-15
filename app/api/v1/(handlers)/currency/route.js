import { handleApiError } from '@/helpers/errorHelpers';

// internal imports
import { UNIRATE_API_KEY } from '@/constants/env';
import {
  getCachedRate,
  setCachedRate,
  fxBuffer,
} from '@/libs/cache/currencyCache';

export async function POST(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const code = searchParams?.get('code')?.toUpperCase();

  try {
    const { amounts } = await Request.json();

    if (code === 'USD') {
      return Response.json({ data: amounts }, { status: 200 });
    }

    let rate = getCachedRate(code);

    if (!rate) {
      // No cache hit, fetch new rate
      const res = await fetch(
        `https://api.unirateapi.com/api/rates?api_key=${UNIRATE_API_KEY}&from=USD`
      );

      const text = await res.text();
      console.log('Unirate error response:', text);

      const { rates } = await res.json();

      rate = rates?.[code];

      if (!rate) {
        return Response.json(
          { message: 'Invalid currency code.' },
          { status: 400 }
        );
      }

      setCachedRate(code, rate);
    }

    const converted = amounts.map(
      (amount) => Math.round(amount * rate * fxBuffer * 1000) / 1000
    );

    return Response.json({ data: converted }, { status: 200 });
  } catch (error) {
    console.error('Unirate api error', error);

    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
