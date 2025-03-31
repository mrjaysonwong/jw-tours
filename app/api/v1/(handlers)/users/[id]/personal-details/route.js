import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { personalDetailsSchema } from '@/validation/yup/user/personalDetailsSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import { updatePersonalDetails } from '@/services/user';

// PATCH: /api/v1/users/[id]/personal-details
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const formData = await Request.json();

    await personalDetailsSchema.validate(
      { ...formData },
      { abortEarly: false }
    );

    await validateSessionAndUser(userId);

    await updatePersonalDetails({ formData, userId });

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
