// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/libs/connectMongo';
import Review from '@/models/reviewModel';

// GET: /api/v1/tours/[id]/reviews
export async function GET(Request, { params }) {
  const tourId = params.id;

  const searchParams = Request.nextUrl.searchParams;
  const limit = parseInt(searchParams.get('limit')) || 1;
  const offset = parseInt(searchParams.get('offset')) || 0;
  const rating = searchParams.get('rating');

  try {
    // connect to database
    await connectMongo();

    const query = {
      tour: tourId,
    };

    if (rating !== 'all') query.rating = +rating;

    const reviews = await Review.find(query)
      .skip(offset)
      .limit(limit)
      .populate('user', 'firstName lastName image');

    const totalReviews = await Review.countDocuments(query);

    return Response.json({ data: reviews, totalReviews }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}

// POST: /api/v1/tours/[id]/reviews
export async function POST(Request) {
  try {
    const data = await Request.json();

    // connect to database
    await connectMongo();

    await Review.create({
      ...data,
    });

    return Response.json(
      {
        message:
          'Thank you for sharing your feedback! Your review will appear once approved.',
      },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);
    return Response.json({ message }, { status });
  }
}
