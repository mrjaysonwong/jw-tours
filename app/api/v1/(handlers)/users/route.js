import { auth } from '@/auth';
import connectMongo from '@/services/db/connectMongo';
import User from '@/models/userModel';

const projectedFields = {
  default: 'email firstName lastName image role status',
};

// optional hybrid filter by $text index and $regex
const buildUserFilter = (query) => {
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
          { 'email.email': { $regex: query, $options: 'i' } },
          { role: { $regex: indexedQuery, $options: 'i' } },
          { status: { $regex: indexedQuery, $options: 'i' } },
        ],
      },
    ],
  };
};

// GET: /api/v1/users
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const query = searchParams.get('q')?.toLowerCase();
  const page = parseInt(searchParams.get('page')) || 1;
  const limit = parseInt(searchParams.get('limit')) || 20;

  try {
    const session = await auth();

    if (!session) {
      return Response.json(
        {
          statusText:
            'Unauthorized. Authentication is required to access this resource.',
        },
        { status: 401 }
      );
    }

    const isAdminRole = session.user.role === 'admin';

    if (!isAdminRole) {
      return Response.json(
        {
          statusText: 'Unauthorized. Only admin can access this resource.',
        },
        { status: 401 }
      );
    }

    // connect to database
    await connectMongo();

    const filter = buildUserFilter(query);

    const users = await User.find(filter)
      .select(projectedFields.default)
      .limit(limit)
      .skip(limit * (page - 1));

    const totalUsers = await User.countDocuments(filter);

    return Response.json({ data: users, total: totalUsers }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        statusText: 'Internal Server Error',
      },
      { status: 500 }
    );
  }
}
