// import { Infobip, AuthType } from '@infobip-api/sdk';
import twilio from 'twilio';

/* Infobip.com
# minimum balance $6
# country's coverage, restrictions
# https://www.infobip.com/docs/essentials/asia-registration/philippines-letter-of-authorization-loa-guidelines#registration-requirements
# response status and error codes https://www.infobip.com/docs/essentials/api-essentials/response-status-and-error-codes
*/

// const infobipClient = new Infobip({
//   baseUrl: process.env.INFOBIP_BASE_URL,
//   apiKey: process.env.INFOBIP_API_KEY,
//   authType: AuthType.ApiKey,
// });

// export const sendSMS = async (outbound, otp) => {
//   try {
//     const infobipResponse = await infobipClient.channels.sms.send({
//       type: 'text',
//       messages: [
//         {
//           destinations: [
//             {
//               to: outbound,
//             },
//           ],
//           from: 'JW Tours',
//           text: `Your JW Tours verification code is: ${otp}`,
//         },
//       ],
//     });

//     console.log('Infobip response:', infobipResponse.data.messages);
//   } catch (error) {
//     console.error('Infobip SMS error:', error);
//     throw new Error('Internal Server Error');
//   }
// };


/* Twilio.com
# minimun balance between $20 and $2000
*/

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;

const accountSid = process.env.TWILIO_TEST_ACCOUNT_SID;
const authToken = process.env.TWILIO_TEST_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export const sendSMS = async (outbound, otp) => {
  try {
    const message = await client.messages.create({
      body: `Your JW Tours verification code is: ${otp}`,
      from: '+15005550006', // test_credentials
      //   from: '+17545818696', // trial
      to: '+639089694134',
    });

    // console.log('Twilio info', message);
    console.log('Twilio info body:', message.body);
  } catch (error) {
    console.error('Twilio SMS error:', error);
    throw new Error('Internal Server Error');
  }
};
