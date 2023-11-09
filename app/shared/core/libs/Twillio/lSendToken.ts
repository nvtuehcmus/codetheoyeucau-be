import { Twilio } from 'twilio';
import * as process from 'process';

export const lSendToken = (phoneNumber: string) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID ?? '';
  const authToken = process.env.TWILIO_AUTH_TOKEN ?? '';
  const serviceId = process.env.TWILIO_SERVICE_ID ?? '';

  const client = new Twilio(accountSid, authToken);

  return new Promise((resolve, reject) => {
    client.verify.v2
      .services(serviceId)
      .verifications.create({ to: phoneNumber, channel: 'sms' })
      .then((verification) => resolve(verification))
      .catch((e) => {
        reject(e);
      });
  });
};
