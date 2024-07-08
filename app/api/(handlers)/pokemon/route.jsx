import axios from 'axios';

export async function GET(Request) {
  try {
    const { data } = await axios.get(
      'https://pokeapi.co/api/v2/pokemon?limit=100000'
    );

    return Response.json(data, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json(
      { message: 'Internal Server Error. Try again.' },
      { status: 500 }
    );
  }
}
