import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import connectMongo from '@/libs/connectMongo';
import { tourSchema } from '@/validation/yup/tour/tourSchema';
import Tour from '@/models/tourModel';
import User from '@/models/userModel';
import { uploadTourImages } from '@/services/tours/uploadTourImages';
import { generateUniqueId } from '@/helpers/uniqueIdHelper';

// POST: /api/v1/admin/create-tour
export async function POST(Request) {
  try {
    let tourId = await generateUniqueId(Tour, 'tourId');
    const data = await Request.json();

    await tourSchema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();
    await authorizeAdmin(session);

    const [value, unit] = data.duration.split(' ');

    // connect to database
    await connectMongo();

    const guideUser = await User.findById(data.guide);

    if (!guideUser) {
      return Response.json(
        { message: 'Guide not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    if (!guideUser.guideCustomId) {
      guideUser.guideCustomId = await generateUniqueId(User, 'guideCustomId');
      await guideUser.save();
    }

    const uploadedImages = await uploadTourImages(
      data.images.map((img) => img.url),
      tourId
    );

    await Tour.create({
      tourId,
      title: data.title,
      overview: data.overview,
      images: uploadedImages,
      destination: data.destination,
      geoLocation: data.geoLocation,
      itinerary: data.itinerary,
      meetingLocation: data.meetingLocation,
      capacity: data.capacity,
      pricing: data.pricing,
      freeCancellation: data.freeCancellation,
      guide: data.guide,
      tourAvailability: data.tourAvailability,
      startTime: data.startTime,
      duration: {
        value: +value,
        unit,
      },
      transportation: data.transportation,
      inclusions: data.inclusions,
      importantInfo: data.importantInfo,
    });

    return Response.json(
      {
        message: 'New tour was successfully created.',
      },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
