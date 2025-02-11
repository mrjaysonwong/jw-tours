// internal imports
import { validateSession } from '@/validation/validateSesssion';
import { preferencesSchema } from '@/validation/yup/user/preferencesSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import connectMongo from '@/services/db/connectMongo';
import User from '@/models/userModel';
import { findUserById } from '@/services/user/userQueries';

// PATCH: /api/v1/users/[id]/preferences
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    await validateSession();

    const formData = await Request.json();

    await preferencesSchema.validate({ ...formData }, { abortEarly: false });

    // connect to database
    await connectMongo();

    await findUserById(userId);

    // Abstract functions if will add more preferences
    const updatedPreferences = await User.findOneAndUpdate(
      { _id: userId },
      { $set: formData },
      { new: true }
    ).select('langCode');

    return Response.json(
      {
        statusText: 'Successfully Updated',
        langCode: updatedPreferences.langCode,
      },
      { status: 200 }
    );
  } catch (error) {
    const { statusText, status } = handleApiError(error);

    return Response.json({ statusText }, { status });
  }
}
