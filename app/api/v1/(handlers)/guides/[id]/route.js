import mongoose from 'mongoose';

// internal imports
import connectMongo from '@/libs/connectMongo';
import User from '@/models/userModel';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';

// GET: /api/v1/guides/[id]
export async function GET(Request, { params }) {
  const guideId = params.id;

  try {
    if (!mongoose.isValidObjectId(guideId)) {
      return Response.json(
        { message: 'Invalid guide ID format' },
        { status: STATUS_CODES.BAD_REQUEST }
      );
    }

    // connect to database
    await connectMongo();

    const guide = await User.findById(guideId).select('-password');

    if (!guide || guide.length === 0) {
      return Response.json(
        { data: guide, message: 'Guide not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: guide }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
