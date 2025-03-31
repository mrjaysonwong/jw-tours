import { createUserSchema } from '@/validation/yup/admin/createUserSchema';
import { validateSessionAdminRole } from '@/services/auth/validateSessionAdminRole';
import { handleApiError } from '@/helpers/errorHelpers';
import { createUser } from '@/services/admin/createUser';
import connectMongo from '@/services/db/connectMongo';

// POST: /api/v1/admin/create-user
export async function POST(Request) {
  try {
    const formData = await Request.json();

    await createUserSchema.validate({ ...formData }, { abortEarly: false });

    await validateSessionAdminRole();

    // connect to database
    await connectMongo();
    await createUser(formData);

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
