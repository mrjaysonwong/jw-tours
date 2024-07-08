import axios from 'axios';

export async function GET(Request) {
    try {

        const url = `https://pokeapi.co/api/v2/pokemon?limit=100000`;

        const options = {
            method: 'GET',
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
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