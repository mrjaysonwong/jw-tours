import { validateSession } from '@/validation/validateSesssion';
import { addNewUserSchema } from '@/validation/yup/admin/addNewUserSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { createUser } from '@/services/admin/createUser';
import connectMongo from '@/services/db/connectMongo';

export async function POST(Request) {
  try {
    await validateSession();

    const formData = await Request.json();

    await addNewUserSchema.validate({ ...formData }, { abortEarly: false });

    await connectMongo();

    await createUser(formData);

    return Response.json(
      {
        statusText: 'New user successfully added.',
      },
      { status: 201 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
