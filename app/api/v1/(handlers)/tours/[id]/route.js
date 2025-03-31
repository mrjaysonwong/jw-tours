import connectMongo from '@/services/db/connectMongo';
import Tour from '@/models/tourModel';
import { handleApiError } from '@/helpers/errorHelpers';
import mongoose from 'mongoose';
import { STATUS_CODES } from '@/constants/common';

// GET: /api/v1/tours/[id]
export async function GET(Request, { params }) {
  const tourId = params.id;

  try {
    if (!mongoose.isValidObjectId(tourId)) {
      return Response.json(
        { message: 'Invalid tour ID format' },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // connect to database
    await connectMongo();

    const tour = await Tour.findById(tourId).populate('guide', '-password');

    if (!tour) {
      return Response.json(
        { data: tour, message: 'Tour not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: tour }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
