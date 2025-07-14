import { HttpError } from '@/helpers/errorHelpers';
import { formatUTC } from '@/utils/formats/formatDates';
import User from '@/models/userModel';

const API_KEY = process.env.MAILERLITE_API_KEY;
const API_URL = 'https://connect.mailerlite.com/api/subscribers';

export async function subscribeToNewsletter(
  isSubscribed,
  userId,
  session,
  userExists,
  validIp
) {
  try {
    const { email, name } = session.user;
    const { isSubscribed: currentSubscriptionStatus, subscriberId } =
      userExists.subscription;
    const wasUnsubscribed = currentSubscriptionStatus === false;

    if (isSubscribed === currentSubscriptionStatus) return;

    const dateNow = formatUTC(new Date(), true);
    const payload = {
      email,
      fields: { userid: userId, name },
      status: isSubscribed ? 'active' : 'unsubscribed',
      resubscribe: isSubscribed,
      opted_in_at: isSubscribed ? dateNow : undefined,
      optin_ip: isSubscribed ? validIp : undefined,
      unsubscribed_at: !isSubscribed ? dateNow : undefined,
    };

    const shouldCreate = !subscriberId || (isSubscribed && wasUnsubscribed);
    const endpoint = shouldCreate ? API_URL : `${API_URL}/${subscriberId}`;
    const method = shouldCreate ? 'POST' : 'PUT';

    const response = await fetch(endpoint, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new HttpError({
        message:
          data.message ||
          `Failed to ${isSubscribed ? 'subscribe' : 'unsubscribe'}`,
        status: response.status,
      });
    }

    // Save new subscriber ID if created
    if (shouldCreate && data.id) {
      await User.findByIdAndUpdate(
        userId,
        { 'subscription.subscriberId': data.id },
        { new: true }
      ).select('subscription');
    }

    return data;
  } catch (error) {
    throw error;
  }
}
