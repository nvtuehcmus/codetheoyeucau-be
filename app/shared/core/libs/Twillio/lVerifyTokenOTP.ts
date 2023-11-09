import process from 'process';
import { Twilio } from 'twilio';

export const lVerifyTokenOTP = (phoneNumber: string, token: string): Promise<string> => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID ?? '';
  const authToken = process.env.TWILIO_AUTH_TOKEN ?? '';
  const serviceId = process.env.TWILIO_SERVICE_ID ?? '';

  const client = new Twilio(accountSid, authToken);

  return new Promise((resolve, reject) => {
    client.verify.v2
      .services(serviceId)
      .verificationChecks.create({ to: phoneNumber, code: token })
      .then((verification_check) => {
        return resolve(verification_check.status);
      })
      .catch((e) => {
        reject(e);
      });
  });
};
