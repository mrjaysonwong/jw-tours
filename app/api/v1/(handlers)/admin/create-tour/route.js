import { validateSessionAdminRole } from '@/services/auth/validateSessionAdminRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import connectMongo from '@/services/db/connectMongo';
import { createTourSchema } from '@/validation/yup/admin/createTourSchema';
import Tour from '@/models/tourModel';
import User from '@/models/userModel';
import { customAlphabet } from 'nanoid';
import { uploadTourImages } from '@/services/tour/uploadTourImages';

const nanoid = customAlphabet('123456', 6);

// POST: /api/v1/admin/create-tour
export async function POST(Request) {
  try {
    const tourId = nanoid();
    const formData = await Request.json();

    await createTourSchema.validate({ ...formData }, { abortEarly: false });

    await validateSessionAdminRole();

    // connect to database
    await connectMongo();

    const guideUser = await User.findById(formData.guide);

    if (!guideUser) {
      return Response.json(
        { message: 'Guide not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    if (!guideUser.guideCustomId) {
      let uniqueId;
      let isUnique = false;

      // Keep generating until a unique ID is found
      while (!isUnique) {
        uniqueId = nanoid();
        const existingUser = await User.findOne({ guideCustomId: uniqueId });

        if (!existingUser) {
          isUnique = true;
        }
      }

      guideUser.guideCustomId = uniqueId;
      await guideUser.save();
    }

    const uploadedImages = await uploadTourImages(formData.images, tourId);

    await Tour.create({
      tourId,
      title: formData.title,
      overview: formData.overview,
      images: uploadedImages,
      destination: formData.destination,
      itinerary: formData.itinerary,
      meetingLocation: formData.meetingLocation,
      capacity: formData.capacity,
      pricing: formData.pricing,
      guide: formData.guide,
      tourAvailability: formData.tourAvailability,
      startTime: formData.startTime,
      duration: formData.duration,
      transportation: formData.transportation,
      inclusions: formData.inclusions,
      importantInfo: formData.importantInfo,
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
