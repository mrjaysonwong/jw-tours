import { unstable_noStore as noStore } from 'next/cache';

// internal imports
import { validateSession } from '@/services/auth/validateSession';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import connectMongo from '@/libs/connectMongo';
import Booking from '@/models/bookingModel';
import Tour from '@/models/tourModel';
import { formatFromToDate } from '@/utils/formats/formatDates';

const allowedParams = [
  'transactionId',
  'tourFrom',
  'tourTo',
  'bookingFrom',
  'bookingTo',
  'status',
  'sort',
];

// GET: /api/v1/users/[id]/bookings
export async function GET(Request, { params }) {
  noStore();
  const userId = params.id;
  const searchParams = Request.nextUrl.searchParams;
  const queryParams = {};

  for (const key of allowedParams) {
    const value = searchParams.get(key);
    if (value) queryParams[key] = value;
  }

  const {
    transactionId,
    tourFrom,
    tourTo,
    bookingFrom,
    bookingTo,
    status,
    sort,
  } = queryParams;

  const statusList = status?.split(',') || [];
  const sortAscDesc = sort === 'oldest' ? 1 : -1;

  const { fromDate: tourFromDate, toDate: tourToDate } = formatFromToDate({
    from: tourFrom,
    to: tourTo,
  });

  const { fromDate: bookingFromDate, toDate: bookingToDate } = formatFromToDate(
    { from: bookingFrom, to: bookingTo }
  );

  try {
    const session = await validateSession();

    // connect to database
    await connectMongo();
    await authorizeUser({ session, userId });

    // base query builder
    const query = {
      booker: userId,
    };

    if (transactionId) {
      query.transactionId = transactionId;
    }

    if (tourFrom) {
      query['bookingRequest.tourDate'] = {
        $gte: tourFromDate,
        ...(tourTo && { $lt: tourToDate }),
      };
    }

    if (bookingFrom) {
      query.bookingDate = {
        $gte: bookingFromDate,
        ...(bookingTo && { $lt: bookingToDate }),
      };
    }

    if (statusList.length > 0) {
      query.status = { $in: statusList };
    }

    const bookings = await Booking.find(query)
      .populate({ path: 'tour' })
      .sort({ bookingDate: sortAscDesc });

    if (!bookings?.length) {
      return Response.json(
        { message: 'Bookings not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: bookings }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
