import { safeFetch } from '@/helpers/safeFetch';
import { encodeKey } from '@/libs/paymongo';

export async function fetchRefunds(amount, paymentId, reason) {
  const url = 'https://api.paymongo.com/refunds';

  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Basic ${encodeKey}`,
    },
    body: JSON.stringify({
        data: {
          attributes: {
            amount,
            payment_id: paymentId,
            reason,
          },
        },
      }),
  };

  return safeFetch(url, options);
}
