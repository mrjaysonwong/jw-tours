// internal imports
import { validateSession } from '@/services/auth/validateSession';
import connectMongo from '@/libs/connectMongo';
import { authorizeUser } from '@/services/auth/authorizeRole';
import { preferencesSchema } from '@/validation/yup/user/preferencesSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import User from '@/models/userModel';
import { subscribeToNewsletter } from '@/services/users/subscription';

const projection = 'subscription';

// PATCH: /api/v1/users/[id]/preferences
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const data = await Request.json();

    const isSubscribed = data.subscription.isSubscribed === true;

    await preferencesSchema.validate({ ...data }, { abortEarly: false });

    const session = await validateSession();

    // connect to database
    await connectMongo();
    const userExists = await authorizeUser({ session, userId, projection });

    // Get the IP Address
    const ipAddress =
      Request.headers.get('x-forwarded-for')?.split(',')[0] ||
      Request.headers.get('cf-connecting-ip') ||
      Request.headers.get('x-real-ip') ||
      Request.socket?.remoteAddress ||
      '0.0.0.0';

    const validIp =
      ipAddress === '::1' || ipAddress === '127.0.0.1' ? '0.0.0.0' : ipAddress;

    const updatedSubscriber = await subscribeToNewsletter(
      isSubscribed,
      userId,
      session,
      userExists,
      validIp
    );

    // Abstract functions if will add more preferences
    const updatedPreferences = await User.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          langCode: data.langCode,
          'subscription.isSubscribed': data.subscription.isSubscribed,
          'subscription.subscriberId': updatedSubscriber?.data?.id,
        },
      },
      { new: true }
    ).select('langCode subscription');

    return Response.json(
      {
        message: 'Successfully Updated',
        langCode: updatedPreferences.langCode,
      },
      { status: 200 }
    );
  } catch (error) {
    const { message, status } = handleApiError(error);

    return Response.json({ message }, { status });
  }
}
