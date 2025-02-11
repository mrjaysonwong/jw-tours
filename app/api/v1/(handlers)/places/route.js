import { HttpError, handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/api';
import { getLocalMessage } from '@/helpers/errorHelpers';

// GET: /api/v1/places
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const namePrefix = searchParams.get('namePrefix');

  try {
    if (!namePrefix) {
      throw new HttpError({
        message: getLocalMessage('Missing parameter namePrefix.'),
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const externalUrl = `https://wft-geo-db.p.rapidapi.com/v1/geo/places`;

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST,
      },
    };

    const queryParams = new URLSearchParams({
      namePrefix: namePrefix,
      limit: 10,
      sort: '-population',
    }).toString();

    const url = `${externalUrl}?${queryParams}`;

    const res = await fetch(url, options);

    if (!res.ok) {
      throw new HttpError({
        message: 'Failed to fetch location',
        status: res.status,
      });
    }

    const data = await res.json();

    const result = data.data;

    return Response.json(result, { status: 200 });
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
