import { safeFetch } from '@/helpers/safeFetch';
import { encodeKey } from '@/lib/paymongo';

export async function fetchPaymentIntent(id) {
  const url = `https://api.paymongo.com/v1/payment_intents/${id}`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Basic ${encodeKey}`,
    },
  };

  return safeFetch(url, options);
}
