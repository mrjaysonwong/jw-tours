import connectMongo from '@/libs/connectMongo';
import Tour from '@/models/tourModel';
import Review from '@/models/reviewModel';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import { getParam } from '@/utils/common';
import { PROJECTED_FIELDS } from '@/constants/projectedFields';

const sorters = {
  price_asc: (a, b) => a.totalCost - b.totalCost,
  price_desc: (a, b) => b.totalCost - a.totalCost,
  rating_desc: (a, b) => {
    const scoreA = a.avgRating * Math.min(a.reviewCount, 10);
    const scoreB = b.avgRating * Math.min(b.reviewCount, 10);
    return scoreB - scoreA;
  },
};

const allowedParams = [
  'geoLocation',
  'destination',
  'guideId',
  'minDuration',
  'maxDuration',
  'transportation',
  'sort',
];

function buildDurationQuery(minDuration, maxDuration) {
  const min = +minDuration;
  const max = +maxDuration;

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

async function getReviewsSummary(tours) {
  const reviews = await Review.aggregate([
    {
      $match: {
        tour: { $in: tours.map((t) => t._id) },
        status: 'approved',
      },
    },
    {
      $group: {
        _id: '$tour',
        avgRating: { $avg: '$rating' },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  const reviewsMap = {};

  for (const r of reviews) {
    reviewsMap[r._id.toString()] = {
      avgRating: r.avgRating,
      reviewCount: r.reviewCount,
    };
  }

  return reviewsMap;
}

// GET: /api/v1/tours
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const queryParams = {};

  for (const key of allowedParams) {
    const value = getParam(searchParams, key);
    if (value) queryParams[key] = value;
  }

  const {
    geoLocation,
    destination,
    guideId,
    minDuration,
    maxDuration,
    transportation,
    sort,
  } = queryParams;

  const transportationList = transportation?.split(',') || [];

  try {
    // connect to database
    await connectMongo();

    const query = {};

    if (guideId) query.guide = guideId;
    if (geoLocation) query.geoLocation = geoLocation;
    if (destination) query['destination.name'] = destination;
    if (transportationList.length > 0) {
      query['transportation.type'] = { $in: transportationList };
    }
    if (minDuration && maxDuration) {
      Object.assign(query, buildDurationQuery(minDuration, maxDuration));
    }

    const tours = await Tour.find(query).populate(
      'guide',
      PROJECTED_FIELDS.GUIDE
    );

    const reviewsMap = await getReviewsSummary(tours);

    const updatedTours = tours.map((tour) => ({
      ...tour.toObject(),
      totalCost:
        tour.pricing.tourCost +
        tour.pricing.serviceFee +
        (tour.pricing.enablePerPersonFee ? tour.pricing.perPersonFee : 0),
      avgRating: reviewsMap[tour._id.toString()]?.avgRating ?? 0,
      reviewCount: reviewsMap[tour._id.toString()]?.reviewCount ?? 0,
    }));

    const sorter = sorters[sort] || sorters.price_asc;
    updatedTours.sort(sorter);

    if (!tours?.length) {
      return Response.json(
        { data: [], message: 'Tours not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: updatedTours }, { status: 200 });
  } catch (error) {
    console.error(error)
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
