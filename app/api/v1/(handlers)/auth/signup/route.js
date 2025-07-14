// internal imports
import { signUpSchema } from '@/validation/yup/auth/signUpSchema';
import connectMongo from '@/libs/connectMongo';
import { handleApiError } from '@/helpers/errorHelpers';
import { registerUser } from '@/services/users/registerUser';

// POST: /api/v1/auth/signup
export async function POST(Request) {
  try {
    const data = await Request.json();

    await signUpSchema.validate({ ...data }, { abortEarly: false });

    // connect to database
    await connectMongo();

    await registerUser(data);

    return Response.json(
      {
        message: `Verification link has been sent to ${data.email}`,
      },
      { status: 201 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
