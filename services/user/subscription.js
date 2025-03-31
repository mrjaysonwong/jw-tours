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
    const [firstName, lastName] = session.user.name.split(' ');

    const subscriberId = userExists.subscription.subscriberId;
    const customFormat = true;

    const requestBody = {
      email: session.user.email,
      fields: {
        userid: userId,
        name: firstName,
        last_name: lastName,
      },
      status: isSubscribed ? 'active' : 'unsubscribed',
      opted_in_at: isSubscribed
        ? formatUTC(new Date(), customFormat)
        : undefined,
      optin_ip: isSubscribed ? validIp : undefined,
      unsubscribed_at: !isSubscribed
        ? formatUTC(new Date(), customFormat)
        : undefined,
    };

    let response;
    let updatedUser;

    if (subscriberId) {
      // Update existing subscriber if ID is stored
      response = await fetch(`${API_URL}/${subscriberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });
    } else {
      response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify(requestBody),
      });
    }

    const data = await response.json();

    if (!response.ok) {
      throw new HttpError({
        message:
          data.message ||
          `Failed to ${isSubscribed ? 'subscribed' : 'unsubscribed'}`,
        status: response.status,
      });
    }

    if (!subscriberId && data.id) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          'subscription.subscriberId': data.id,
        },
        { new: true }
      ).select('subscription');
    }

    return { data, updatedUser };
  } catch (error) {
    throw error;
  }
}
