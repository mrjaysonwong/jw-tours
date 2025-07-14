import { unstable_noStore as noStore } from 'next/cache';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

// internal imports
import { auth } from '@/auth';
import Checkout from '@/app/(features)/checkout/Checkout';
import Custom404 from '@/components/errors/Custom404';
import {
  getCurrencyFromCookies,
  getAuthFetchOptions,
} from '@/helpers/pageHelpers';
import { fetchCheckout } from '@/services/checkouts/fetchCheckouts';
import { convertCurrency } from '@/helpers/convertCurrency';
import { fetchTourBookings } from '@/services/bookings/fetchBookings';

export const metadata = { title: 'Checkout' };

const validSteps = ['activity', 'contact', 'payment'];

async function convertedCheckOutData(checkout, currency) {
  const { tourCost, serviceFee, perPersonFee } = checkout.tour.pricing;

  const partySize = checkout.bookingRequest.partySize;
  const totalPerPersonFee = perPersonFee * partySize;
  const totalServiceFee =
    partySize === 1 ? serviceFee : serviceFee + (3.5 * totalPerPersonFee) / 100;

  const amounts = [tourCost, totalServiceFee, perPersonFee || 0];

  const [convertedTourCost, convertedTotalServiceFee, convertedPerPersonFee] =
    await convertCurrency(currency.code, amounts);

  const convertedBookingPrice = {
    tourCost: convertedTourCost,
    serviceFee: convertedTotalServiceFee,
    perPersonFee: convertedPerPersonFee,
  };

  const convertedTotalPerPersonFee =
    convertedBookingPrice.perPersonFee * partySize;

  const convertedTotalCost =
    convertedBookingPrice.tourCost +
    convertedBookingPrice.serviceFee +
    convertedTotalPerPersonFee;

  return {
    convertedBookingPrice,
    convertedTotalPerPersonFee,
    convertedTotalCost,
  };
}

export default async function CheckOutSlugPage({ params: { slug } }) {
  noStore();
  const currency = getCurrencyFromCookies(cookies);

  const [checkoutId, step] = slug;

  if (!validSteps.includes(step) || slug.length > 2) return <Custom404 />;

  const session = await auth();
  if (!session) redirect('/signin');

  const options = getAuthFetchOptions(cookies);
  const checkout = await fetchCheckout({ checkoutId, options });

  if (!checkout) redirect('/cart');

  const tourId = checkout.tour._id;
  const tourDate = checkout.bookingRequest.tourDate;

  const bookings = await fetchTourBookings({ tourId, tourDate });

  if (bookings?.[0]?.status === 'confirmed') {
    redirect('/bookings');
  }

  const {
    convertedBookingPrice,
    convertedTotalPerPersonFee,
    convertedTotalCost,
  } = await convertedCheckOutData(checkout, currency);

  const updatedCheckout = {
    ...checkout,
    currency,
    convertedBookingPrice,
    convertedTotalCost,
    totalPerPersonFee: convertedTotalPerPersonFee,
  };

  return <Checkout checkout={updatedCheckout} />;
}
