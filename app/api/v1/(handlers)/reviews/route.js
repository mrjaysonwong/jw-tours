// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/lib/connectMongo';
import Review from '@/models/reviewModel';
import User from '@/models/userModel';
import Tour from '@/models/tourModel';
import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { sanitizeQueryParams } from '@/utils/queryParams';
import { reviewTabLabelsMap } from '@/constants/tabs';
import { reviewTableParams } from '@/constants/queryParams';
import { defaultPage, defaultLimit } from '@/constants/pagination';

const allowedTabs = Object.keys(reviewTabLabelsMap);

const lookupAndUnwindUsers = [
  {
    $lookup: {
      from: 'users',
      localField: 'user',
      foreignField: '_id',
      as: 'user',
      pipeline: [
        { $project: { image: 1, firstName: 1, lastName: 1, email: 1 } },
      ],
    },
  },
  { $unwind: '$user' },
];

const lookupAndUnwindTours = [
  {
    $lookup: {
      from: 'tours',
      localField: 'tour',
      foreignField: '_id',
      as: 'tour',
      pipeline: [{ $project: { title: 1 } }],
    },
  },
  { $unwind: '$tour' },
];

async function getStatusCount(query) {
  const statusCounts = await Review.aggregate([
    { $match: query },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const counts = { pending: 0, approved: 0, rejected: 0 };

  for (const doc of statusCounts) {
    counts[doc._id] = doc.count;
  }

  counts.all = counts.pending + counts.approved + counts.rejected;

  return counts;
}

async function buildReviewFilter(q) {
  if (!q) return {};

  const regexFilter = { $regex: q, $options: 'i' };

  const [users, tours] = await Promise.all([
    User.find({
      $or: [
        { firstName: regexFilter },
        { lastName: regexFilter },
        { 'email.email': regexFilter },
      ],
    }).select('_id'),
    Tour.find({ title: regexFilter }).select('_id'),
  ]);

  return {
    $or: [
      { user: { $in: users.map((u) => u._id) } },
      { tour: { $in: tours.map((t) => t._id) } },
    ],
  };
}

// GET: /api/v1/reviews
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const queryParams = sanitizeQueryParams(searchParams, reviewTableParams);

  const { q, page, limit, sort, tab } = Object.fromEntries(
    queryParams.entries()
  );

  const pageNum = parseInt(page, 10) || defaultPage;
  const limitNum = parseInt(limit, 10) || defaultLimit;

  try {
    const session = await validateSession();
    await authorizeAdmin(session);

    // connect to database
    await connectMongo();

    const query = await buildReviewFilter(q);
    const isValidTab = allowedTabs.includes(tab);

    const listFilter =
      isValidTab && tab !== 'all' ? { ...query, status: tab } : query;

    // Total results for the current tab
    const totalCount = await Review.countDocuments(listFilter);
    const statusCount = await getStatusCount(query);

    // Build query for actual data
    let reviewsQuery = Review.find(listFilter).populate([
      { path: 'user', select: 'image firstName lastName email' },
      { path: 'tour', select: 'title' },
    ]);

    // Pagination
    if (page || limit) {
      const skip = (pageNum - 1) * limitNum;
      reviewsQuery = reviewsQuery.skip(skip).limit(limitNum);
    }

    // Sorting
    if (sort) {
      // Expected format: sort=field_asc|desc
      const [rawField, direction] = sort.split('_');
      const sortDir = direction === 'desc' ? -1 : 1;

      const fieldMap = {
        lastname: 'lastName',
        createdat: 'createdAt',
      };

      const field = fieldMap[rawField] || rawField;

      if (rawField === 'lastname') {
        const reviews = await Review.aggregate([
          { $match: listFilter },
          ...lookupAndUnwindUsers,
          ...lookupAndUnwindTours,
          { $sort: { 'user.lastName': sortDir } },
          { $skip: (pageNum - 1) * limitNum },
          { $limit: limitNum },
        ]).collation({ locale: 'en', strength: 2 });

        return Response.json(
          { reviews, totalCount, statusCount },
          { status: 200 }
        );
      } else {
        reviewsQuery = reviewsQuery.sort({ [field]: sortDir });
      }
    }

    const reviews = await reviewsQuery;

    return Response.json({ reviews, totalCount, statusCount }, { status: 200 });
  } catch (error) {
    console.error(error);
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
