import { doHttp } from 'shared/helpers/httpClient';
import { utf8ToBase64 } from 'shared/helpers';
import { BRAND_NAME, OTP_TEMPLATE } from 'shared/const';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';

export const lSendOTP = async (phoneNumber: string, otp: string) => {
  try {
    const sessionId = `request-otp-${phoneNumber}`;
    const requestAccess = (await doHttp({
      serviceName: 'post_sign_in',
      body: {
        client_id: process.env.FPT_CLIENT_ID,
        client_secret: process.env.FPT_SECRET_ID,
        scope: 'send_brandname_otp send_brandname',
        session_id: sessionId,
        grant_type: 'client_credentials'
      }
    })) as any;

    const accessToken = requestAccess.access_token;

    await doHttp({
      serviceName: 'post_sms_otp',
      body: {
        access_token: accessToken,
        session_id: sessionId,
        BrandName: BRAND_NAME,
        Phone: phoneNumber,
        Message: utf8ToBase64(OTP_TEMPLATE(otp)),
        RequestId: sessionId
      }
    });
  } catch (e) {
    throw new LogError(ErrorVars.E019_FPT_SEND_OTP_ERROR, 'INTEGRATION', undefined, undefined, (e as Error)?.message);
  }
};
