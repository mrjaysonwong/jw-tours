import mongoose from 'mongoose';

// internal imports
import { tourSchema } from '@/validation/yup/tour/tourSchema';
import connectMongo from '@/libs/connectMongo';
import Tour from '@/models/tourModel';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import { updateTourImages } from '@/services/tours/uploadTourImages';
import { getReviewSummary } from '@/services/reviews/reviewSummary';

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

    const { starCounts, totalCount, avgRating } = await getReviewSummary(
      tourId
    );

    const updatedTour = {
      ...tour.toObject(),
      reviewSummary: {
        starCounts,
        reviewCount: totalCount,
        avgRating: +avgRating.toFixed(2),
      },
    };

    return Response.json({ data: updatedTour }, { status: 200 });
  } catch (error) {
    console.error('Fetch tour error', error)

    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}

// PATCH: /api/v1/tours/[id]
export async function PATCH(Request, { params }) {
  const tourId = params.id;

  if (!mongoose.isValidObjectId(tourId)) {
    return Response.json(
      { message: 'Invalid tour ID format' },
      { status: STATUS_CODES.BAD_REQUEST }
    );
  }

  try {
    const data = await Request.json();

    await tourSchema.validate({ ...data }, { abortEarly: false });

    const dataImages = data.images.map((img) => img.url);

    const base64Images = dataImages.filter(
      (img) =>
        img.startsWith('data:image/jpeg;base64,') ||
        img.startsWith('data:image/png;base64,')
    );

    // connect to database
    await connectMongo();

    const tourExists = await Tour.findById(tourId).select('tourId images');

    if (!tourExists) {
      return Response.json(
        { message: 'Tour not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    await updateTourImages(base64Images, tourId, tourExists, dataImages);

    const { images, duration, ...restFields } = data;
    const fields = { ...restFields };

    if (duration) {
      const [value, unit] = duration.split(' ');
      fields.duration = { value: +value, unit };
    }

    await Tour.updateOne({ _id: tourId }, { $set: fields });

    return Response.json({ message: 'Successfully Updated!' }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
