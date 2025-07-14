import { createUserSchema } from '@/validation/yup/admin/createUserSchema';
import { validateSession } from '@/services/auth/validateSession';
import { authorizeAdmin } from '@/services/auth/authorizeRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { createUser } from '@/services/admin/createUser';
import connectMongo from '@/libs/connectMongo';

// POST: /api/v1/admin/create-user
export async function POST(Request) {
  try {
    const data = await Request.json();

    await createUserSchema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();
    await authorizeAdmin(session);

    // connect to database
    await connectMongo();
    await createUser(data);

    return Response.json(
      {
        message: 'New user successfully added.',
      },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
