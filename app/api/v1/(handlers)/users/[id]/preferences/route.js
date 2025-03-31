// internal imports
import { validateSessionAndUser } from '@/services/auth/validateSessionAndUser';
import { preferencesSchema } from '@/validation/yup/user/preferencesSchema';
import { handleApiError } from '@/helpers/errorHelpers';
import User from '@/models/userModel';
import { subscribeToNewsletter } from '@/services/user/subscription';

// PATCH: /api/v1/users/[id]/preferences
export async function PATCH(Request, { params }) {
  const userId = params.id;

  try {
    const formData = await Request.json();
    const isSubscribed = formData.subscription.isSubscribed === true;

    await preferencesSchema.validate({ ...formData }, { abortEarly: false });

    const projection = 'subscription';
    const { session, userExists } = await validateSessionAndUser(
      userId,
      projection
    );

    // Get the IP Address
    const ipAddress =
      Request.headers.get('x-forwarded-for')?.split(',')[0] ||
      Request.headers.get('cf-connecting-ip') ||
      Request.headers.get('x-real-ip') ||
      Request.socket?.remoteAddress ||
      '0.0.0.0';

    const validIp =
      ipAddress === '::1' || ipAddress === '127.0.0.1' ? '0.0.0.0' : ipAddress;

    const { updatedUser } = await subscribeToNewsletter(
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
          langCode: formData.langCode,
          'subscription.isSubscribed': formData.subscription.isSubscribed,
          'subscription.subscriberId': updatedUser?.subscription?.subscriberId,
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
