import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/libs/connectMongo';
import User from '@/models/userModel';
import { STATUS_CODES } from '@/constants/common';

// GET: /api/v1/guides
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const city = searchParams?.get('city')?.replace(/-/g, ' ').toLowerCase();

  try {
    // connect to database
    await connectMongo();

    let guides;

    if (city) {
      guides = await User.find({
        'address.city': { $regex: city, $options: 'i' },
      }).select('-password');
    } else {
      guides = await User.find({ role: 'guide' }).select('-password');
    }

    if (!guides || guides.length === 0) {
      return Response.json(
        { data: guides, message: 'Guides not found' },
        { status: STATUS_CODES.NOT_FOUND }
      );
    }

    return Response.json({ data: guides }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
