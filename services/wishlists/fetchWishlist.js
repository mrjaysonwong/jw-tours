'use server';

import { cookies } from 'next/headers';

// internal imports
import connectMongo from '@/lib/connectMongo';
import Wishlist from '@/models/wishlistModel';
import Tour from '@/models/tourModel';
import { getToursReviewMap } from '@/services/reviews/reviewStats';
import { auth } from '@/auth';
import { getCurrencyFromCookies } from '@/helpers/pageHelpers';
import { convertCurrency } from '@/helpers/convertCurrency';

export async function fetchWishlist() {
  const cookieStore = cookies();
  const guestId = cookieStore.get('guest_id')?.value;
  const currency = getCurrencyFromCookies(cookies);

  const session = await auth();
  const userId = session?.user?.id;

  try {
    // connect to database
    await connectMongo();

    let guestWishlistQuery = guestId
      ? Wishlist.findOne({ guestId })
          .populate({
            path: 'tours',
            populate: {
              path: 'guide',
              select:
                'firstName lastName image language gender nationality address',
            },
          })
          .lean()
      : Promise.resolve(null);

    let userWishlistQuery = userId
      ? Wishlist.findOne({ userId })
          .populate({
            path: 'tours',
            populate: {
              path: 'guide',
              select:
                'firstName lastName image language gender nationality address',
            },
          })
          .lean()
      : Promise.resolve(null);

    const [guestWishlist, userWishlist] = await Promise.all([
      guestWishlistQuery,
      userWishlistQuery,
    ]);

    // Helper to attach ratings and costs
    const enrichTours = async (wishlist) => {
      if (!wishlist) return { tours: [] };

      const reviewMap = await getToursReviewMap(wishlist.tours);

      const updatedTours = wishlist.tours.map((tour) => ({
        ...tour,
        totalCost:
          tour.pricing.tourCost +
          tour.pricing.serviceFee +
          (tour.pricing.enablePerPersonFee ? tour.pricing.perPersonFee : 0),
        avgRating: reviewMap[tour._id.toString()]?.avgRating ?? 0,
        reviewCount: reviewMap[tour._id.toString()]?.reviewCount ?? 0,
      }));

      // Currency conversion here
      const amounts = updatedTours.map((t) => t.totalCost);
      const converted = await convertCurrency(currency.code, amounts);

      const convertedTours = updatedTours.map((tour, index) => ({
        ...tour,
        convertedTotalCost: converted[index],
        currency,
      }));

      return JSON.parse(JSON.stringify({ ...wishlist, tours: convertedTours }));
    };

    return {
      guest: await enrichTours(guestWishlist),
      user: await enrichTours(userWishlist),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
