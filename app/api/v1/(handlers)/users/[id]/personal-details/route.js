import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { personalDetailsSchema } from '@/validation/yup/user/personalDetailsSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePersonalDetails } from '@/services/users';

// PATCH: /api/v1/users/[id]/personal-details
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const data = await Request.json();

    await personalDetailsSchema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();

    // connect to database
    await connectMongo();
    await authorizeUser({ session, userId });

    await updatePersonalDetails({ data, userId });

    return Response.json(
      {
        message: 'Successfully Updated',
      },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
