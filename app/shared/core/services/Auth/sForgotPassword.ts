import { LogError } from 'shared/core/error/logError';
import { ErrorVars } from 'shared/core/error/errorVars';
import { sSendToken } from 'shared/core/services/Sender/sSendToken';
import { sVerifyOTP } from 'shared/core/services/Sender/sVerifyOTP';
import { rUpdateUserPassword } from 'shared/core/repo/Auth/rUpdateUserPassword';
import { userValidation } from 'shared/core/services/helpers/userValidation';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from 'process';

export const sRequestForgotPassword = async (username: string): Promise<void> => {
  await sSendToken(username, 'FORGOT');
};

export const sVerifyForgotPasswordToken = async (username: string, otp: string): Promise<string> => {
  const user = await userValidation(username);

  await sVerifyOTP(username, otp, 'FORGOT');

  return jwt.sign(
    {
      id: user.id,
      username: user.username
    },
    process.env.RESET_PASSWORD_TOKEN ?? '',
    { expiresIn: '5m' }
  );
};

export const sSetPassword = async (password: string, token: string): Promise<void> => {
  try {
    const payload = jwt.verify(token, process.env.RESET_PASSWORD_TOKEN ?? '');
    await rUpdateUserPassword((payload as JwtPayload).username, password);
  } catch (e) {
    throw new LogError(ErrorVars.E010_TOKEN_EXPIRED, 'LOGIC');
  }
};
