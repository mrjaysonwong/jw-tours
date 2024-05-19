import User from '@/model/userModel';
import Token from '@/model/tokenModel';
import connectMongo from '@/lib/connection';

export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const userId = searchParams.get('userId');

  await connectMongo();

  const userExists = await User.findById(userId);

  return Response.json({ data: userExists }, { status: 200 });
}

// export function POST(Request) {
//   const { body } = Request.body;

//   return Response.json({ data: body });
// }
