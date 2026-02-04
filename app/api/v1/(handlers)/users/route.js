import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/lib/connectMongo';
import User from '@/models/userModel';
import { PROJECTED_FIELDS } from '@/constants/projectedFields';
import { sanitizeQueryParams } from '@/utils/queryParams';
import { userTabLabelsMap } from '@/constants/tabs';
import { userRoles } from '@/constants/roles';
import { userTableParams } from '@/constants/queryParams';
import { defaultPage, defaultLimit } from '@/constants/pagination';

const allowedTabs = Object.keys(userTabLabelsMap);

async function getStatusCount(query) {
  const statusCounts = await User.aggregate([
    { $match: query },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  const counts = { active: 0, pending: 0, suspended: 0, inactive: 0 };

  for (const doc of statusCounts) {
    counts[doc._id] = doc.count;
  }

  counts.all =
    counts.active + counts.pending + counts.suspended + counts.inactive;

  return counts;
}

function buildUserFilter(q) {
  const baseFilter = { role: { $ne: 'admin' } };

  if (!q) return baseFilter;

  const regexFilter = { $regex: q, $options: 'i' };

  return {
    $and: [
      baseFilter,
      {
        $or: [
          { firstName: regexFilter },
          { lastName: regexFilter },
          { 'email.email': regexFilter },
        ],
      },
    ],
  };
}

// GET: /api/v1/users
export async function GET(Request) {
  const searchParams = Request.nextUrl.searchParams;
  const queryParams = sanitizeQueryParams(searchParams, userTableParams);

  const { q, page, limit, sort, tab, role } = Object.fromEntries(
    queryParams.entries()
  );

  const pageNum = parseInt(page, 10) || defaultPage;
  const limitNum = parseInt(limit, 10) || defaultLimit;

  try {
    const session = await validateSession();
    await authorizeAdmin(session);

    // connect to database
    await connectMongo();

    const query = buildUserFilter(q);
    const isValidTab = allowedTabs.includes(tab);

    const roleFilter = role && userRoles.includes(role) ? { role } : {};

    const listFilter =
      isValidTab && tab !== 'all'
        ? { ...query, status: tab, ...roleFilter }
        : { ...query, ...roleFilter };

    // Total results for the current tab
    const totalCount = await User.countDocuments(listFilter);
    const statusCount = await getStatusCount({
      ...query,
      ...roleFilter,
    });

    // Build query for actual data
    let usersQuery = User.find(listFilter).select(PROJECTED_FIELDS.DEFAULT);

    // Pagination
    if (page || limit) {
      const skip = (pageNum - 1) * limitNum;
      usersQuery = usersQuery.skip(skip).limit(limitNum);
    }

    // Sorting
    if (sort) {
      // Expected format: sort=field_asc|desc
      const [rawField, direction] = sort.split('_');
      const sortDir = direction === 'desc' ? -1 : 1;

      const fieldMap = {
        firstname: 'firstName',
        lastname: 'lastName',
        createdat: 'createdAt',
      };

      const field = fieldMap[rawField.toLowerCase()] || rawField;

      usersQuery = usersQuery
        .collation({ locale: 'en', strength: 2 })
        .sort({ [field]: sortDir });
    }

    const users = await usersQuery;

    return Response.json(
      { data: users, totalCount, statusCount },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
