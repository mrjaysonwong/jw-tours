import { getToursReviewMap } from '@/services/reviews/reviewStats';
import { convertCurrency } from '@/helpers/convertCurrency';

const sorters = {
  price_asc: (a, b) => a.totalCost - b.totalCost,
  price_desc: (a, b) => b.totalCost - a.totalCost,
  rating_desc: (a, b) => {
    const scoreA = a.avgRating * Math.min(a.reviewCount, 10);
    const scoreB = b.avgRating * Math.min(b.reviewCount, 10);
    return scoreB - scoreA;
  },
};

export async function getConvertedTours({
  tours,
  currency,
  pageNum,
  limitNum,
  totalCount,
  sort,
}) {
  const reviewsMap = await getToursReviewMap(tours);
  const updatedTours = tours.map((tour) => ({
    ...tour.toObject(),
    totalCost:
      tour.pricing.tourCost +
      tour.pricing.serviceFee +
      (tour.pricing.enablePerPersonFee ? tour.pricing.perPersonFee : 0),
    avgRating: reviewsMap[tour._id.toString()]?.avgRating ?? 0,
    reviewCount: reviewsMap[tour._id.toString()]?.reviewCount ?? 0,
  }));

  let filteredTours = updatedTours;

  const sorter = sorters[sort] || sorters.price_asc;
  filteredTours.sort(sorter);

  const amounts = filteredTours.map((t) => t.totalCost);
  const converted = await convertCurrency(currency?.code, amounts);

  const convertedTours = filteredTours.map((tour, index) => ({
    ...tour,
    convertedTotalCost: converted[index],
    currency,
  }));

  // small-medium dataset demo use duplicatedTours
  const duplicatedTours = Array.from({ length: 32 }).flatMap(() =>
    convertedTours.map((t) => ({ ...t }))
  );

  /* test totalCount */
  // const totalCount = duplicatedTours.length;
  const totalPages = Math.ceil(totalCount / limitNum);

  // apply pagination to test dataset
  const start = (pageNum - 1) * limitNum;
  const testTours = duplicatedTours.slice(start, start + limitNum);

  return { convertedTours, totalPages, testTours };
}
