import { validateSession } from '@/validation/validateSesssion';
import { personalDetailsSchema } from '@/validation/yup/user/personalDetailsSchema';
import connectMongo from '@/services/db/connectMongo';
import { findUserById } from '@/services/user/userQueries';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePersonalDetails } from '@/services/user';

// PATCH: /api/v1/users/[id]/personal-details
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const formData = await Request.json();

    await personalDetailsSchema.validate(
      { ...formData },
      { abortEarly: false }
    );

    // connect to database
    await connectMongo();
    await findUserById(userId);

    await updatePersonalDetails({ formData, userId });

    return Response.json(
      {
        statusText: 'Successfully Updated',
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
