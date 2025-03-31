import { render } from '@react-email/render';

// internal imports
import NewsletterTemplate from '@/templates/NewsletterTemplate';
import User from '@/models/userModel';
import { HttpError } from '@/helpers/errorHelpers';

const API_KEY = process.env.MAILERLITE_API_KEY;

async function createAndSendCampaign(emailHtml) {
  try {
    const API_URL = 'https://connect.mailerlite.com/api/campaigns';

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        name: 'March Newsletter',
        type: 'regular',
        emails: [
          {
            subject: 'Your Weekly Newsletter',
            from_name: 'JW Tours',
            from: 'contactme.jwong@gmail.com', // Must be a verified email in MailerLite
            content: emailHtml, // Attach rendered email HTML
          },
        ],
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new HttpError({
        message: data.message || 'Failed to create campaign',
        status: response.status,
      });
    }

    const campaignId = data.id;

    // Automatically send the campaign after it is created
    const sendResponse = await sendCampaign(campaignId);

    return sendResponse;
  } catch (error) {
    throw error;
  }
}

async function sendCampaign(campaignId) {
  try {
    const API_URL = `https://connect.mailerlite.com/api/campaigns/${campaignId}/send`;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new HttpError({
        message: data.message || 'Failed to send campaign',
        status: response.status,
      });
    }

    return data;
  } catch (error) {
    throw error;
  }
}

export async function sendBatch(userIds) {
  try {


    // fix the client side ui pre-selected user table only subscribers allowed to send newsletter

    const users = await User.find({
      _id: { $in: userIds },
    }).select('subscription');

    const subscriberIds = users.map((user) => {
      return user.subscription.subscriberId
    });

    const emailHtml = render(<NewsletterTemplate />);
    const sendResponse = await createAndSendCampaign(emailHtml, subscriberIds);

    console.log(`✅ Campaign sent successfully`);

    return sendResponse;
  } catch (error) {
    throw error;
  }
}
