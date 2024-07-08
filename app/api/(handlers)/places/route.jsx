import axios from 'axios';

export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const namePrefix = searchParams.get('namePrefix');

  try {
    if (!namePrefix) {
      return Response.json(
        { message: 'An error occurred. Try again.' },
        { status: 400 }
      );
    }

    const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/places`;

    // no need mode: 'cors' in API Routes/Nextjs
    // same-origin only by default
    const options = {
      method: 'GET',
      params: {
        namePrefix: namePrefix,
        limit: 10,
        sort: '-population',
      },
      headers: {
        'X-RapidAPI-Key': process.env.RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.RAPID_API_HOST,
      },
    };

    const { data } = await axios.get(url, options);
    const result = data.data;

    return Response.json(result, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'Internal Server Error. Try again.' },
      { status: 500 }
    );
  }
}
