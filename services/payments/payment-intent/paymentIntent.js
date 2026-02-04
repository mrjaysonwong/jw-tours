// third-party imports
import axios from 'axios';

// internal imports
import { UNIRATE_API_KEY } from '@/constants/env';
import { encodeKey } from '@/lib/paymongo';
import { fxBuffer } from '@/lib/cache/currencyCache';
import { BASE_URL } from '@/constants/env';

async function convertToPHP(amount) {
  const res = await fetch(
    `https://api.unirateapi.com/api/rates?api_key=${UNIRATE_API_KEY}&from=USD`
  );

  const { rates } = await res.json();
  const phpRate = rates.PHP;

  return Math.round(amount * phpRate * fxBuffer) * 100;
}

function getOptions(url, bodyParams) {
  const options = {
    method: 'POST',
    url: url,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      authorization: `Basic ${encodeKey}`,
    },
    data: {
      data: {
        attributes: {
          ...bodyParams,
        },
      },
    },
  };

  return options;
}

export async function createPaymentMethod({ data }) {
  const { paymentMethod, billing } = data;

  try {
    const url = 'https://api.paymongo.com/v1/payment_methods';
    const bodyParams = {
      type: paymentMethod.type,
      details: {
        card_number: paymentMethod.cardNumber,
        exp_month: paymentMethod.exp_month,
        exp_year: paymentMethod.exp_year,
        cvc: paymentMethod.securityCode,
      },
      billing: {
        name: billing.name,
        email: billing.email,
        phone: billing.phone,
      },
    };

    const options = getOptions(url, bodyParams);

    const { data } = await axios(options);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createPaymentIntent({ data }) {
  const { amount } = data;

  // use for demo, since paymongo has cap of 100k peso test env.
  const phpAmountInCentavos = await convertToPHP(amount);

  try {
    const url = 'https://api.paymongo.com/v1/payment_intents';
    const bodyParams = {
      amount: Math.round(amount) * 100,
      // amount: phpAmountInCentavos,
      payment_method_allowed: ['card', 'dob', 'paymaya', 'gcash'],
      payment_method_options: {
        card: { request_three_d_secure: 'any' },
      },
      currency: 'PHP',
      capture_type: 'automatic',
    };

    const options = getOptions(url, bodyParams);
    const { data } = await axios(options);

    return data;
  } catch (error) {
    throw error;
  }
}

export async function attachToPaymentIntent(
  paymentMethodData,
  paymentIntentData
) {
  try {
    const url = `https://api.paymongo.com/v1/payment_intents/${paymentIntentData.id}/attach`;

    const bodyParams = {
      payment_method: paymentMethodData.id,
      return_url: `${BASE_URL}/bookings`,
    };

    const options = getOptions(url, bodyParams);

    const { data } = await axios(options);
    return data;
  } catch (error) {
    throw error;
  }
}
