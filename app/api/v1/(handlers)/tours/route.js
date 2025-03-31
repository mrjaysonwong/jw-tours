import connectMongo from '@/services/db/connectMongo';
import Tour from '@/models/tourModel';
import { handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';

const projectedFields = 'firstName lastName image';

// GET: /api/v1/tours
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const geoLocation = searchParams
    ?.get('geolocation')
    ?.replace(/-/g, ' ')
    .toLowerCase();
  const destination = searchParams
    ?.get('destination')
    ?.replace(/-/g, ' ')
    .toLowerCase();
  const guideId = searchParams?.get('guideId');

  try {
    // connect to database
    await connectMongo();

    let tours;

    if (!geoLocation && !destination && !guideId) {
      tours = await Tour.find({}).populate('guide', projectedFields);
    } else if (geoLocation && !destination) {
      tours = await Tour.find({
        'destination.geoLocation': geoLocation,
      }).populate('guide', projectedFields);
    } else if (guideId) {
      tours = await Tour.find({ guide: guideId });
    } else {
      tours = await Tour.find({
        'destination.geoLocation': geoLocation,
        'destination.name': destination,
      }).populate('guide', projectedFields);
    }
    
    if (!tours || tours.length === 0) {
      return Response.json(
        { data: tours, message: 'Tours not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: tours }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
