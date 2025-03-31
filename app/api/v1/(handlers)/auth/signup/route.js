// internal imports
import { signUpSchema } from '@/validation/yup/auth/signUpSchema';
import connectMongo from '@/services/db/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { registerUser } from '@/services/user/registerUser';

// POST: /api/v1/auth/signup
export async function POST(Request) {
  try {
    const formData = await Request.json();

    await signUpSchema.validate({ ...formData }, { abortEarly: false });

    // connect to database
    await connectMongo();

    await registerUser(formData);

    return Response.json(
      {
        message: `Verification link has been sent to ${formData.email}`,
      },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
