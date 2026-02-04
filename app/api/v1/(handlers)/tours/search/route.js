import { headers } from 'next/headers';

// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/lib/connectMongo';
import Tour from '@/models/tourModel';
import { PROJECTED_FIELDS } from '@/constants/projectedFields';
import { sanitizeQueryParams, buildTourQuery } from '@/utils/queryParams';
import { defaultPage, defaultPageLimit } from '@/constants/pagination';
import { getConvertedTours } from '@/services/tours/getConvertedTours';
import { normalizeQueryValues } from '@/utils/queryParams';
import { apiTourListParams } from '@/constants/queryParams';

// centralize filter params | NYD

// GET: /api/v1/tours/search
export async function GET(Request) {
  const headersList = headers();
  const currencyHeader = headersList?.get('x-currency');
  const currency = JSON.parse(decodeURIComponent(currencyHeader));

  const searchParams = Request.nextUrl.searchParams;
  const queryParams = sanitizeQueryParams(searchParams, apiTourListParams);

  const { minDuration, maxDuration, transportation, sort, q, page, limit } =
    normalizeQueryValues(Object.fromEntries(queryParams.entries()));

  const pageNum = parseInt(page, 10) || defaultPage;
  const limitNum = parseInt(limit, 10) || defaultPageLimit;
  const skip = (pageNum - 1) * limitNum;
  const transportationList = transportation?.split(',') || [];

  try {
    // connect to database
    await connectMongo();

    const normalizedQ = q?.trim();

    if (!normalizedQ) {
      return Response.json(
        {
          data: [],
          pagination: { totalCount: 0, totalPages: 0, currentPage: pageNum },
        },
        { status: 200 }
      );
    }

    const query = buildTourQuery({
      q: normalizedQ,
      minDuration,
      maxDuration,
      transportationList,
    });

    const totalCount = await Tour.countDocuments(query);

    // comment skip and limit to test dataset testTours
    const tours = await Tour.find(query)
      .populate('guide', PROJECTED_FIELDS.GUIDE)
      .skip(skip)
      .limit(limitNum);

    const { convertedTours, totalPages, testTours } = await getConvertedTours({
      tours,
      currency,
      pageNum,
      limitNum,
      totalCount,
      sort,
    });

    // replace data with testTours for test dataset
    return Response.json(
      {
        data: convertedTours,
        pagination: { totalCount, totalPages, currentPage: pageNum },
      },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
