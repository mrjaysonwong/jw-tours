import { headers } from 'next/headers';

// internal imports
import connectMongo from '@/lib/connectMongo';
import Tour from '@/models/tourModel';
import Review from '@/models/reviewModel';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import { PROJECTED_FIELDS } from '@/constants/projectedFields';
import { getToursReviewMap } from '@/services/reviews/reviewStats';
import { convertCurrency } from '@/helpers/convertCurrency';
import { sanitizeQueryParams } from '@/utils/queryParams';
import { defaultPage, defaultPageLimit } from '@/constants/pagination';
import { apiTourListParams } from '@/constants/queryParams';
import { normalizeQueryValues } from '@/utils/queryParams';

const sorters = {
  price_asc: (a, b) => a.totalCost - b.totalCost,
  price_desc: (a, b) => b.totalCost - a.totalCost,
  rating_desc: (a, b) => {
    const scoreA = a.avgRating * Math.min(a.reviewCount, 10);
    const scoreB = b.avgRating * Math.min(b.reviewCount, 10);
    return scoreB - scoreA;
  },
};

async function getConvertedTours({
  tours,
  isTopDestination,
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

  if (isTopDestination) {
    const defaultRating = 0;
    filteredTours = filteredTours
      .filter((tour) => tour.avgRating >= defaultRating)
      .slice(0, 30);
  }

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

  // apply pagination on test dataset
  const start = (pageNum - 1) * limitNum;
  const testTours = duplicatedTours.slice(start, start + limitNum);

  return { convertedTours, totalPages, testTours };
}

function buildQuery(q) {
  if (!q) return {};

  const regexFilter = { $regex: q, $options: 'i' };

  return {
    $or: [{ title: regexFilter }],
  };
}

function buildDurationQuery(minDuration, maxDuration) {
  const min = parseInt(minDuration, 10) || 1;
  const max = parseInt(maxDuration, 10) || 5;

  if (min === 24) {
    return {
      'duration.unit': { $in: ['day', 'days', 'week', 'weeks'] },
    };
  }

  // mixed: hours + multi-day
  if (max === 24) {
    return {
      $or: [
        {
          'duration.value': { $gte: min, $lte: 24 },
          'duration.unit': { $in: ['hour', 'hours'] },
        },
        {
          'duration.unit': { $in: ['day', 'days', 'week', 'weeks'] },
        },
      ],
    };
  }

  return {
    'duration.value': { $gte: min, $lte: max },
    'duration.unit': { $in: ['hour', 'hours'] },
  };
}

// GET: /api/v1/tours
export async function GET(Request) {
  const headersList = headers();
  const currencyHeader = headersList?.get('x-currency');
  const currency = JSON.parse(decodeURIComponent(currencyHeader));

  const searchParams = Request.nextUrl.searchParams;
  const queryParams = sanitizeQueryParams(searchParams, apiTourListParams);

  const {
    geoLocation,
    destination,
    guideId,
    minDuration,
    maxDuration,
    transportation,
    sort,
    page,
    limit,
    top_destination,
    q,
  } = normalizeQueryValues(Object.fromEntries(queryParams.entries()));

  const pageNum = parseInt(page, 10) || defaultPage;
  const limitNum = parseInt(limit, 10) || defaultPageLimit;
  const skip = (pageNum - 1) * limitNum;

  const transportationList = transportation?.split(',') || [];
  const isTopDestination = top_destination === 'true';

  try {
    // connect to database
    await connectMongo();

    // Base query
    const query = {};

    if (guideId) query.guide = guideId;
    if (geoLocation) {
      query.$or = [{ geoLocation }, { 'destination.country': geoLocation }];
    }
    if (destination) query['destination.name'] = destination;
    if (transportationList.length > 0) {
      query['transportation.type'] = { $in: transportationList };
    }
    if (minDuration && maxDuration) {
      Object.assign(query, buildDurationQuery(minDuration, maxDuration));
    }
    if (q) {
      Object.assign(query, buildQuery(q));
    }

    // total count for pagination
    const totalCount = await Tour.countDocuments(query);

    let locationExists;

    if (geoLocation) {
      locationExists = await Tour.exists({
        $or: [{ geoLocation }, { 'destination.country': geoLocation }],
      });

      if (!locationExists) {
        return Response.json(
          {
            data: [],
            locationExists: !!locationExists,
            pagination: {
              totalPages: Math.ceil(totalCount / limitNum),
              currentPage: pageNum,
            },
            message: 'Tours not found',
          },
          { status: STATUS_CODES.NOT_FOUND }
        );
      }
    }

    const tours = await Tour.find(query)
      .populate('guide', PROJECTED_FIELDS.GUIDE)
      .skip(skip)
      .limit(limitNum);

    const { convertedTours, totalPages, testTours } = await getConvertedTours({
      tours,
      isTopDestination,
      currency,
      pageNum,
      limitNum,
      totalCount,
      sort,
    });

    return Response.json(
      {
        data: convertedTours,
        locationExists: !!locationExists,
        pagination: {
          totalCount,
          totalPages,
          currentPage: pageNum,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
