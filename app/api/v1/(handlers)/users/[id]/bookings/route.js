import { unstable_noStore as noStore } from 'next/cache';
import { Types } from 'mongoose';

// internal imports
import { validateSession } from '@/services/auth/validateSession';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import connectMongo from '@/lib/connectMongo';
import Booking from '@/models/bookingModel';
import { formatFromToDate } from '@/utils/formats/formatDates';
import { apiUserBookingsParams } from '@/constants/queryParams';
import { sanitizeQueryParams } from '@/utils/queryParams';

const lookupAndUnwindReviews = [
  {
    $lookup: {
      from: 'reviews',
      localField: '_id',
      foreignField: 'booking',
      as: 'tourReview',
      pipeline: [{ $project: { status: 1, _id: 0 } }],
    },
  },
  { $unwind: { path: '$tourReview', preserveNullAndEmptyArrays: true } },
];

const lookupAndUnwindTours = [
  {
    $lookup: {
      from: 'tours',
      localField: 'tour',
      foreignField: '_id',
      as: 'tour',
    },
  },
  { $unwind: '$tour' },
];

const lookupAndUnwindTourGuide = [
  {
    $lookup: {
      from: 'users',
      localField: 'tour.guide',
      foreignField: '_id',
      as: 'tour.guide',
      pipeline: [
        { $project: { image: 1, firstName: 1, lastName: 1, email: 1 } },
      ],
    },
  },
  { $unwind: { path: '$tour.guide', preserveNullAndEmptyArrays: true } },
];

// GET: /api/v1/users/[id]/bookings
export async function GET(Request, { params }) {
  noStore();
  const userId = params.id;
  const searchParams = Request.nextUrl.searchParams;

  const queryParams = sanitizeQueryParams(searchParams, apiUserBookingsParams);

  const {
    transactionId,
    tourFrom,
    tourTo,
    bookingFrom,
    bookingTo,
    status,
    sort,
  } = Object.fromEntries(queryParams.entries());

  const statusList = status?.split(',') || [];
  const sortDir = sort === 'oldest' ? 1 : -1;

  const { fromDate: tourFromDate, toDate: tourToDate } = formatFromToDate({
    from: tourFrom,
    to: tourTo,
  });

  const { fromDate: bookingFromDate, toDate: bookingToDate } = formatFromToDate(
    { from: bookingFrom, to: bookingTo }
  );

  try {
    const session = await validateSession();
    await connectMongo();
    await authorizeUser({ session, userId });

    // Base matchStage
    const matchStage = { booker: new Types.ObjectId(`${userId}`) };

    if (transactionId) {
      matchStage.transactionId = transactionId;
    }

    if (tourFrom) {
      matchStage['bookingRequest.tourDate'] = {
        $gte: tourFromDate,
        ...(tourTo && { $lt: tourToDate }),
      };
    }

    if (bookingFrom) {
      matchStage.bookingDate = {
        $gte: bookingFromDate,
        ...(bookingTo && { $lt: bookingToDate }),
      };
    }

    if (statusList.length > 0) {
      matchStage.status = { $in: statusList };
    }

    // ---- Single aggregation ----
    const bookings = await Booking.aggregate([
      { $match: matchStage },
      ...lookupAndUnwindReviews,
      ...lookupAndUnwindTours,
      // join guide inside the tour
      ...lookupAndUnwindTourGuide,
      { $sort: { bookingDate: sortDir } },
    ]);

    if (!bookings?.length) {
      return Response.json(
        { message: 'Bookings not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: bookings }, { status: 200 });
  } catch (error) {
    console.error(error);
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
