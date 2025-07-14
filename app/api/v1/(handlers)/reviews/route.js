// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/libs/connectMongo';
import Review from '@/models/reviewModel';
import Tour from '@/models/tourModel';
import { getParam } from '@/utils/common';

const allowedParams = ['userId'];

// GET: /api/v1/reviews
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const queryParams = {};

  for (const key of allowedParams) {
    const value = getParam(searchParams, key);
    if (value) queryParams[key] = value;
  }

  const { userId } = queryParams;

  try {
    // connect to database
    await connectMongo();

    const query = {};

    if (userId) query.user = userId;

    const reviews = await Review.find(query);

    return Response.json({ data: reviews }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
