import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/libs/connectMongo';
import User from '@/models/userModel';
import { PROJECTED_FIELDS } from '@/constants/projectedFields';

function buildUserFilter(query) {
  const baseFilter = { role: { $ne: 'admin' } };

  if (!query) return baseFilter;

  // return {
  //   $and: [baseFilter, { $text: { $search: query } }],
  // };

  const indexedQuery = `^${query}`;

  return {
    $and: [
      baseFilter,
      {
        $or: [
          { firstName: { $regex: indexedQuery, $options: 'i' } },
          { lastName: { $regex: indexedQuery, $options: 'i' } },
          { 'email.email': { $regex: indexedQuery, $options: 'i' } },
          { role: { $regex: indexedQuery, $options: 'i' } },
          { status: { $regex: indexedQuery, $options: 'i' } },
        ],
      },
    ],
  };
}

// GET: /api/v1/users
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 10;

  try {
    const session = await validateSession();
    await authorizeAdmin(session, 'GET');

    // connect to database
    await connectMongo();

    const filter = buildUserFilter(query);

    const users = await User.find(filter)
      .select(PROJECTED_FIELDS.DEFAULT)
      .limit(limit)
      .skip(limit * (page - 1));

    const totalUsers = await User.countDocuments(filter);

    return Response.json({ data: users, total: totalUsers }, { status: 200 });
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
