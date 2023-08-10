import { doHttp } from 'shared/helpers/httpClient';
import { BRAND_NAME, OTP_TEMPLATE } from 'shared/const';
import { generateOTP, utf8ToBase64 } from 'shared/helpers';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { rGetVerifyRequest } from 'shared/core/repo/Auth/rGetVerifyRequest';
import { isDistanceGatherThan } from 'shared/helpers/dateHelper';
import { rSetSendVerifyRequest } from 'shared/core/repo/Auth/rSetVerifyRequest';
import { rGetUserByUsername } from 'shared/core/repo/User/rGetUser';
import { phoneValidation, prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { lSendOTP } from 'shared/core/libs/FPT/lSendOTP';

export const sSendToken = async (phoneNumber: string, type: 'VERIFY' | 'FORGOT') => {
  let username = phoneNumber;

  if (phoneValidation(phoneNumber)) {
    username = prettierPhoneNumber(phoneNumber);
  }

  const user = await rGetUserByUsername(username);
  if (type === 'FORGOT' && !user) {
    throw new LogError(ErrorVars.E002_USER_NOT_EXISTS, 'LOGIC');
  }
  if (type === 'FORGOT' && user && !user.active) {
    throw new LogError(ErrorVars.E005_USER_PENDING, 'LOGIC');
  }

  if (type === 'VERIFY' && user && user.active) {
    throw new LogError(ErrorVars.E022_USER_IS_ACTIVE, 'LOGIC');
  }

  const verifyRequest = await rGetVerifyRequest(username);

  if (verifyRequest && !isDistanceGatherThan(verifyRequest.updatedAt, 86400000)) {
    if (verifyRequest.numberOfSendOTP > 3) {
      throw new LogError(ErrorVars.E018_LIMIT_VERIFY_OTP, 'LOGIC');
    }

    if (!isDistanceGatherThan(verifyRequest.updatedAt, 60000)) {
      throw new LogError(ErrorVars.E021_DISTANCE_MUST_BE_GATHER_MINUTE, 'LOGIC');
    }
  }
  const otp = generateOTP();

  await lSendOTP(username, otp);

  const numberOfSendOTP = verifyRequest ? verifyRequest.numberOfSendOTP + 1 : 1;

  await rSetSendVerifyRequest(username, otp, numberOfSendOTP, type);
};
