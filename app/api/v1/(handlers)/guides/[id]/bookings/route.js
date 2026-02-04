import { Types } from 'mongoose';

// internal imports
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import connectMongo from '@/lib/connectMongo';
import Booking from '@/models/bookingModel';
import Tour from '@/models/tourModel';

// GET: /api/v1/guides/[id]/bookings
export async function GET(Request, { params }) {
  const guideId = params.id;

  try {
    // connect to database
    await connectMongo();

    const bookings = await Booking.aggregate([
      {
        $lookup: {
          from: 'tours',
          localField: 'tour',
          foreignField: '_id',
          as: 'tour',
          pipeline: [
            { $match: { guide: new Types.ObjectId(`${guideId}`) } },
            { $project: { _id: 1, duration: 1 } },
          ],
        },
      },
      { $unwind: '$tour' },
      { $project: { tour: 1, 'bookingRequest.tourDate': 1 } },
    ]);

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
