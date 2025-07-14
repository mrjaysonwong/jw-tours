import { HttpError, handleApiError } from '@/helpers/errorHelpers';
import { STATUS_CODES } from '@/constants/common';
import { getLocalMessage } from '@/helpers/errorHelpers';

// GET: /api/v1/places
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const searchString = searchParams.get('searchString');

  try {
    if (!searchString) {
      throw new HttpError({
        message: getLocalMessage('Missing parameter search string.'),
        status: STATUS_CODES.BAD_REQUEST,
      });
    }

    const apiKey = process.env.LOCATION_IQ_API_KEY;
    const options = { method: 'GET', headers: { accept: 'application/json' } };

    const params = new URLSearchParams({
      key: apiKey,
      q: searchString,
      limit: '10',
      dedupe: '1',
      'accept-language': 'en',
      countrycodes: 'ph',
    });

    const externalUrl = `https://api.locationiq.com/v1/autocomplete?${params.toString()}`;

    const res = await fetch(externalUrl, options);

    if (!res.ok) {
      throw new HttpError({
        message: 'Failed to fetch location',
        status: res.status,
      });
    }

    const data = await res.json();

    return Response.json(data, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
