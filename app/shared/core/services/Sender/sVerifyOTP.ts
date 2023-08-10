import { rGetVerifyRequest } from 'shared/core/repo/Auth/rGetVerifyRequest';
import { phoneValidation, prettierPhoneNumber } from 'shared/helpers/phoneHelper';
import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { rDeleteVerifyProcess } from 'shared/core/repo/Auth/rDeleteVerifyProcess';

export const sVerifyOTP = async (username: string, otp: string, type: 'VERIFY' | 'FORGOT') => {
  let _username = username;

  if (phoneValidation(username)) {
    _username = prettierPhoneNumber(username);
  }

  const verifyRequest = await rGetVerifyRequest(_username);

  if (!verifyRequest) {
    throw new LogError(ErrorVars.E023_PROCESS_NOT_EXISTS, 'LOGIC');
  }
  if (verifyRequest.type !== type) {
    throw new LogError(ErrorVars.E023_PROCESS_NOT_EXISTS, 'LOGIC');
  }

  if (verifyRequest.numberOfSubmitOTP && verifyRequest.numberOfSendOTP > 3) {
    throw new LogError(ErrorVars.E018_LIMIT_VERIFY_OTP, 'LOGIC');
  }

  if (verifyRequest.numberOfSubmitOTP) {
    throw new LogError(ErrorVars.E024_OTP_EXPIRED, 'LOGIC');
  }

  if (verifyRequest.otp !== otp) {
    throw new LogError(ErrorVars.E006_OPT_INVALID, 'LOGIC');
  }

  await rDeleteVerifyProcess(_username);

  return true;
};
